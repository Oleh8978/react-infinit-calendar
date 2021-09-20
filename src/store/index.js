// eslint-disable-next-line max-classes-per-file
import { makeAutoObservable } from 'mobx';
import { Auth } from 'aws-amplify';

import registerUser from '../../services/registerUser';
import getUser from '../../services/getUser';
import getKycStatus from '../../services/getKycStatus';
import PrimeTrustApprove from '../../services/PrimeTrustApprove';
import getAccessToken from '../../services/cognito/getAccessToken';

import getWallets from '../../services/getWallets';
import createWallet from '../../services/createWallet';
import getCreditInfo from '../../services/getCreditInfo';

import { SERVER_URL, AVAILABLE_COINS } from '../../constants/constants';

class Application {
  constructor(Store) {
    makeAutoObservable(this, {}, { deep: true });
    this.root = Store;
  }

  globalErrors = [];

  notifications = [];

  eject() {
    this.globalErrors = [];
    this.notifications = [];
  }

  async addError(message) {
    this.globalErrors.push({
      message,
      id: `${Math.random()}`,
    });
  }

  async addNotification(message, id = '', isExternal = false) {
    if (message && !this.notifications.some((notification) => notification.id === id)) {
      this.notifications.push({
        message,
        id: id || `${Math.random()}`,
        isExternal,
      });
    }
  }

  deleteError(id) {
    this.globalErrors = this.globalErrors.filter((error) => error.id !== id);
  }

  async deleteNotification(id) {
    let mustConfirm = false;
    this.notifications = this.notifications.filter((notification) => {
      if (notification.id === id && notification.isExternal) {
        mustConfirm = true;
      }
      return notification.id !== id;
    });

    if (mustConfirm) {
      await this.root.user.webSocket.send(JSON.stringify({ type: 'confirmEvent', payload: { id } }));
    }
  }
}

class User {
  tier = 0;
  // tier — it is level of user`s KYC process

  // User opportunities:
  // tier 0 — UNREGISTERED: register, kycStatus, exchangeRate
  // tier 1 — REGISTERED: contactInfo
  // tier 2 — CUSTODIAL: registerContact, uploadScan
  // tier 3 — APPROVED TEXT
  // tier 4 — APPROVED SCAN: all other: deposit, withdraw, etc — 3

  KYCProgress = 1;
  // 1 — must fill text information
  // 2 — must upload scan
  // 3 — everything is uploaded

  status = { address: { status: '' }, aml: { status: '' }, cip: { status: '' }, id: { status: '' }, photo: { status: '' } };

  email = '';

  givenName = '';

  familyName = '';

  rate = 0.1;

  credit = 0.5;

  liquidation = 0.9;

  warning = 0.75;

  webSocket = null;

  provider = '';

  constructor(Store) {
    makeAutoObservable(this, {}, { deep: true });
    this.root = Store;
  }

  eject() {
      this.webSocket?.close();

    this.tier = 0;
    this.KYCProgress = 1;
    this.status = { address: { status: '' }, aml: { status: '' }, cip: { status: '' }, id: { status: '' }, photo: { status: '' } };
    this.email = '';
    this.givenName = '';
    this.familyName = '';
    this.rate = 0.1;
    this.credit = 0.5;
    this.liquidation = 0.9;
    this.warning = 0.75;
    this.webSocket = null;
    this.provider = ''; // oAuth provider: google/facebook/apple
  }

  static isKYCPending(status) { // if data is sent to PrimeTrust but still not approved
    return Object.keys(status.status)
      .some((statusItem) => status.status[statusItem] === 'pending');
  }

  // this is point where app connects to the server
  async signIn() {
    try {
      try {
        await getKycStatus()
            .then(async (status) => {
              if (status.tier < 1) { // for the first sign in, registration in back-end
                await registerUser(); // now tier is 1
              }
              await this.KYCApprove(status);
            });
        await this.updateUser();
        await this.root.wallets.updateAllData();

        this.webSocket = new WebSocket(`wss://${SERVER_URL}/websocket`);

        const open = this.webSocket.onopen = async () => {
          this.webSocket.send(JSON.stringify({ token: await getAccessToken() }));
        };

        const onErrorReconnect = this.webSocket.onclose = async () => {
          await getKycStatus()
          .then(async (status) => {
            if (status.tier < 1) { // for the first sign in, registration in back-end
              await registerUser(); // now tier is 1
            }
            await this.KYCApprove(status);
          });
          await open();
        };
        const allRates = [];

        this.webSocket.onmessage = async (message) => {
          const data = await JSON.parse(message.data);
          // eslint-disable-next-line default-case
          switch (data.type) {
            case 'kyc':
              if (data.payload.tier < 1) { // for the first sign in, registration in back-end
                await registerUser(); // now tier is 1
              }

              await this.KYCApprove(data.payload);

              if (!this.root.wallets.wallets.length) {
                await this.root.wallets.updateWallets();
              }
              break;
            case 'event':
              await this.root.application.addNotification(data.payload.data.rendered, data.payload.id, true);
              break;
            case 'rate':
              allRates.push(Object.values(data.payload));
              const rates = Object.fromEntries(allRates);
              this.root.wallets.exchangeRates = rates;

              this.root.wallets.setTotals(rates);
              break;
            case 'payment':
              this.root.transactions.transactions.payments = [...this.root.transactions.transactions.payments, data.payload];
              break;
            case 'transfer':
              this.root.transactions.transactions.transfers = [...this.root.transactions.transactions.transfers, data.payload];
              break;
          }
        };

        this.webSocket.onerror = async () => {
          await onErrorReconnect();
        };
      } catch (error) {
        await this.root.application.addError(error.message);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateUser() { // must update before navigate into User app part
    try {
      const cognitoUser = (await Auth.currentSession()).idToken.payload; // Auth.currentSession() critically important for token refreshing
      const providerType = (cognitoUser?.identities?.find((identity) => Object.prototype.hasOwnProperty.call(identity, 'providerType')))?.providerType;
      this.provider = providerType;

      await getUser()
        .then(async (user) => {
          if (user.tier > 1) {
            this.email = user.email || '';
            this.givenName = user.name.split(' ')[0];
            this.familyName = user.name.split(' ')[1];
          } else {
            this.email = providerType !== ('SignInWithApple' || cognitoUser.email) ? cognitoUser.email : '';
            this.givenName = cognitoUser.given_name || '';
            this.familyName = cognitoUser.family_name || '';
          }

          this.tier = user.tier;
          this.registered = user.registered;
          this.rate = user.params?.rate;
          this.credit = user.params?.thresholds?.credit;
          this.liquidation = user.params?.thresholds?.liquidation;
          this.warning = user.params?.thresholds?.warning;
        });
    } catch (e) {
      await this.root.application.addError(e);
    }
  }

  async setKYCProgress(status) {
    const {
      tier,
      status: {
        documents,
      },
    } = (status ?? await getKycStatus());

    switch (tier) {
      case 1:
        this.KYCProgress = 1;
        break;
      case 2:
      case 3:
        if (documents?.items?.length) {
          this.KYCProgress = 3;
        } else {
          this.KYCProgress = 2;
        }
        break;
      case 4:
        this.KYCProgress = 3;
        break;
      default:
        this.KYCProgress = 1;
    }
  }

  async KYCApprove(status) {
    const _status = status || await getKycStatus();
    this.status = _status?.status;

    await this.setKYCProgress(_status);
    if (User.isKYCPending(_status)) {
      await PrimeTrustApprove();
    } else { // All user information has been approved
      await this.updateUser();

      await this.root.wallets.updateWallets();
    }
  }
}

class Wallets {
  wallets = [];

  isSeveralWallets = false;

  totalAvailable = 0;

  totalSaving = 0;

  totalCredit = 0;

  totalUtilized = 0;

  exchangeRates = {};

  constructor(Store) {
    makeAutoObservable(this, {}, { deep: true });
    this.root = Store;
  }

  eject() {
    clearInterval(this.interval);

    this.wallets = [];
    this.isSeveralWallets = false;
    this.totalAvailable = 0;
    this.totalSaving = 0;
    this.totalCredit = 0;
    this.totalUtilized = 0;
    this.lineOfCredit = 0;
    this.exchangeRates = {};
  }

  setTotals(rates = this.exchangeRates) {
    const app = (
        this.wallets.reduce((accumulator, current) => {
          rates[current.coin] = current.coin === 'USD' ? 1 : rates[current.coin];
          return [
            (accumulator[0] + (rates[current.coin] * current?.wallet?.saving || 0)),
            (accumulator[1] + (rates[current.coin] * current?.wallet?.credit_line || 0)),
          ];
        }, [0, 0]));
    this.totalSaving = app[0];
    this.totalCredit = app[1];
  }

  async updateWallets() {
    if (this.root.user.tier > 2) {
      try {
        await getWallets()
            .then(async (wallets) => {
              const _wallets = Object.keys(wallets)
                  .map((coin) => ({
                    coin,
                    address: wallets.address,
                    ...wallets[coin],
                  }));

              if (_wallets.length === 1) { // Here is creating all available wallets if they weren't created before
                await Promise.all(
                    AVAILABLE_COINS
                        .filter(((_coin) => !this.root.wallets.wallets.some((wallet) => wallet.coin === _coin.value)))
                        .map(async (coin) => {
                          await createWallet(coin.value);
                        }),
                );
                return this.root.wallets.updateWallets();
              }

              this.isSeveralWallets = this.wallets.length > 2; // exclude USD wallet
              this.wallets = _wallets;
              this.setTotals();
            });
      } catch (e) {
        throw new Error(e.message);
      }
    }
  }

  async updateCredit() {
    if (this.root.user.tier > 3) {
      try {
        await getCreditInfo()
          .then((credit) => {
            this.totalAvailable = credit.available;
            this.totalUtilized = credit.used;
            this.lineOfCredit = +credit.available + +credit.used ?? 0;
            return credit;
          });
      } catch (e) {
        throw new Error(e.message);
      }
    }
  }

  async updateAllData() {
    try {
      await this.updateWallets();
      await this.updateCredit();
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

class Transactions {
  transactions = {
    transfers: [],
    payments: [],
  };

  constructor(Store) {
    makeAutoObservable(this, {}, { deep: true });
    this.root = Store;
  }

  eject() {
    this.transactions = {
      transfers: [],
      payouts: [],
    };
  }

  getTransactions() {
    const transactions = {
      deposits: [],
      withdraws: [],
      transfers: [],
      payments: [],
      repays: [],
    };
    this.transactions.transfers?.forEach((transaction) => {
      // eslint-disable-next-line default-case
      switch (transaction.type) {
        case 'deposit':
          transactions.deposits.push({ ...transaction,
            type: 'deposits',
            name: 'Deposit' });
          break;
        case 'withdraw':
          transactions.withdraws.push({ ...transaction,
            type: 'withdraws',
            name: `Withdraw Own ${transaction.coin}` });
          break;
        case 'transfer':
          transactions.transfers.push({ ...transaction,
            type: 'transfers',
            name: `Transfer To ${transaction?.acceptor === 'credit_line' ? 'Credit Line Balance' : transaction?.acceptor === 'saving' ? 'Saving Balance' : ''}` });
      }
    });
    this.transactions.payments?.forEach((transaction) => {
      // eslint-disable-next-line default-case
      switch (transaction.type) {
        case 'withdraw':
          transactions.withdraws.push({ ...transaction,
            type: 'withdraws',
            name: 'Withdraw Credit Funds' });
          break;
        case 'repay':
          transactions.repays.push({ ...transaction,
            type: 'repays',
            name: 'Repay Credit' });
          break;
      }
    });
    return transactions;
  }
}

class Store {
  constructor() {
    this.application = new Application(this);
    this.user = new User(this);
    this.wallets = new Wallets(this);
    this.transactions = new Transactions(this);
  }
}

export default new Store();
