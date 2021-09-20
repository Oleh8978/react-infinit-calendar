import React, { useEffect, useState } from 'react';
import {
  View, Text, SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { validate as btcAddressValidator } from 'bitcoin-address-validation';
import { observer } from 'mobx-react-lite';
import { openLink } from 'react-native-plaid-link-sdk';

import releaseCrypto from '../../../../services/releaseCrypto';
import releaseUSD from '../../../../services/releaseUSD';
import createPlaidToken from '../../../../services/createPlaidToken';
import getPlaidAccounts from '../../../../services/getPlaidAccounts';

import { amountValidator } from '../../../../utilities/yupValidators';
import statusBar from '../../../../utilities/statusBar';
import amountFormatter from '../../../../utilities/formatters/amountFormatter';

import Store from '../../../store';

import {
  BTC_FRACTAL_SYMBOLS,
  ETH_FRACTAL_SYMBOLS,
} from '../../../../constants/constants';

import KeyboardNormalizer from '../../../HOCs/KeyboardNormalizerScrolling';
import FormInput from '../../../components/FormInput/FormInput';
import Header from '../../../components/Header/Header';
import EMLogoHeader from '../../../components/EMLogoHeader/EMLogoHeader';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import Indent from '../../../components/Indent/Indent';
import Notification from '../../../components/Notification/Notification';
import Number from '../../../components/Number/Number';
import Coin from '../../../components/Coin/Coin';

import {
  formWrapper as wrapper,
  inputCurrency,
  greyFormInput,
  view,
  smallHeader,
  blockHeader,
  block,
  flexRow,
} from '../../../../styles/mixins';
import styles from './Withdraw.styles';
import Picker from '../../../components/Picker/Picker';

export default KeyboardNormalizer(
  observer(
    ({
      navigation,
      route: {
        params: { coin },
      },
    }) => {
      useFocusEffect(() => statusBar('dark'));

      const [wallet, setWallet] = useState(null);
      const [plaidToken, setPlaidToken] = useState('');
      const [amount, setAmount] = useState('');
      const [showBankAccountPicker, setShowBankAccountPicker] = useState(false);
      const [bankAccountsList, setBankAccountsList] = useState([]);
      const [accountID, setAccountID] = useState('');
      const [plaidPublicToken, setPlaidPublicToken] = useState('');

      const [showLoader, setShowLoader] = useState(false);
      const [error, setError] = useState('');

      useEffect(() => {
        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
          tabBarVisible: false,
        });
        (async () => {
          try {
            setPlaidToken((await createPlaidToken()).token);
          } catch (e) {
            setError(e);
          }
        })();
      }, []);

      useEffect(() => {
        setWallet(Store.wallets.wallets.find((_wallet) => _wallet?.coin === coin)?.wallet);
      }, [coin, Store.wallets.wallets, Store.wallets.totalSaving]);

      const onWithdraw = async (values, { resetForm }) => {
        try {
          setShowLoader(true);
          if (coin === 'USD') {
            await openLink({
              tokenConfig: { token: plaidToken },
              onSuccess: async ({ publicToken }) => {
                try {
                  const accounts = (await getPlaidAccounts(publicToken))?.map(
                    (account) => ({
                      name: account.name,
                      value: account.account_id,
                    }),
                  );
                  setBankAccountsList(accounts);
                  setAccountID(accounts[0].value);
                  setShowBankAccountPicker(true);
                  setPlaidPublicToken(publicToken);
                } catch (e) {
                  setError(e.message);
                }
              },
            });
          } else {
            await releaseCrypto(coin, values.walletAddress, values.amount);
            await Store.wallets.updateAllData();
            setError('');
          }
        } catch (e) {
          setError(e);
        }
        setShowLoader(false);
        resetForm();
      };

      return (
        <>
          <Formik
            validationSchema={yup.object().shape({
              amount: amountValidator,
            })}
            initialValues={{
              amount: '',
              walletAddress: '',
            }}
            validateOnBlur
            validate={(values) => {
              if (coin !== 'USD' && !values.walletAddress) {
                return { walletAddress: 'Bitcoin address is required!' };
              }
              if (btcAddressValidator(values.walletAddress)) {
                return {};
              }
              if (coin !== 'USD') {
                return { walletAddress: `${coin} address is\`t valid!` };
              }
              return {};
            }}
            onSubmit={onWithdraw}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              dirty,
            }) => (
              <>
                <View style={{ height: '100%' }}>
                  <View style={smallHeader}>
                    <EMLogoHeader />
                    <Header navigation={navigation} topText="Withdraw Funds" />
                  </View>
                  <SafeAreaView style={{ flex: 1 }}>
                    <View
                      style={{
                        ...wrapper,
                        justifyContent: 'space-between',
                        paddingTop: 20,
                        height: '100%',
                      }}
                    >
                      <View style={view}>
                        <View
                          style={{
                            ...block,
                            position: 'relative',
                            top: -40,
                            marginBottom: -10,
                          }}
                        >
                          <View style={blockHeader}>
                            <View style={flexRow}>
                              <Text allowFontScaling={false}>
                                <Text allowFontScaling={false} style={{ fontFamily: 'OpenSans-Bold' }}>
                                  From
                                  {' '}
                                </Text>
                                <Text allowFontScaling={false}>Saving Balance</Text>
                              </Text>
                              <Coin coin={coin} />
                            </View>
                          </View>
                          <View style={styles.subBlockHeader}>
                            <Number
                              style={styles.value}
                              digit={wallet?.saving || ''}
                              type={coin === 'USD' ? 'usd' : 'crypto'}
                            />
                            <Text allowFontScaling={false} style={styles.value}>{` ${coin}`}</Text>
                          </View>
                        </View>
                        <View style={view}>
                          <View style={styles.textLeft}>
                            {coin !== 'USD' && (
                            <>
                              <Text allowFontScaling={false}>To</Text>
                              <FormInput
                                keyboardType="default"
                                set={handleChange('walletAddress')}
                                onBlur={handleBlur('walletAddress')}
                                value={values.walletAddress}
                                error={
                                  touched.walletAddress
                                  && errors.walletAddress
                                }
                                style={greyFormInput}
                              />
                              <Indent height={10} />
                            </>
                            )}
                            <View style={styles.textLeft}>
                              <Text allowFontScaling={false}>Amount</Text>
                            </View>
                            <View>
                              <FormInput
                                keyboardType="numeric"
                                set={(_amount) => {
                                  setAmount(_amount);
                                  amountFormatter(
                                    _amount,
                                    handleChange('amount'),
                                    coin === 'BTC'
                                      ? BTC_FRACTAL_SYMBOLS
                                      : coin === 'ETH'
                                        ? ETH_FRACTAL_SYMBOLS
                                        : 2,
                                  );
                                }}
                                onBlur={handleBlur('amount')}
                                value={values.amount}
                                error={touched.amount && errors.amount}
                                style={{ ...greyFormInput, paddingRight: 45 }}
                              />
                              <Text allowFontScaling={false} style={inputCurrency}>{coin}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View>
                        <DefaultButton
                          title="Withdraw Funds"
                          onPress={handleSubmit}
                          disabled={!(isValid && dirty)}
                          showLoader={showLoader}
                        />
                        <Indent height={20} />
                        <DefaultButton
                          onPress={() => navigation.goBack()}
                          title="Cancel"
                          isLight
                        />
                      </View>
                    </View>
                  </SafeAreaView>
                </View>
              </>
            )}
          </Formik>
          {showBankAccountPicker && (
          <Picker
            close={() => setShowBankAccountPicker(false)}
            list={bankAccountsList}
            value={accountID}
            onValueChange={setAccountID}
            select={async () => {
              try {
                setShowBankAccountPicker(false);
                await releaseUSD(accountID, plaidPublicToken, amount);
                setAmount('');
                await Store.wallets.updateAllData();
              } catch (e) {
                setError(e);
              }
            }}
          />
          )}
          <Notification notification={error} close={() => setError('')} />
        </>
      );
    },
  ),
);
