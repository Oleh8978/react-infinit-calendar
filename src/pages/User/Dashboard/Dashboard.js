import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert, Text, View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import LinearGradient from 'react-native-linear-gradient';

import statusBar from '../../../../utilities/statusBar';

import Store from '../../../store';

import { DEVICE_WIDTH } from '../../../../constants/constants';
import {
  ACCOUNT,
  DEPOSIT,
  REPAY_CREDIT,
  WITHDRAW_CREDIT,
} from '../../../../constants/navigation/userScreens';

import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import Modal from '../../../components/Modal/Modal';
import Indent from '../../../components/Indent/Indent';
import Score from '../../../components/Score/Score';
import Coin from '../../../components/Coin/Coin';
import Number from '../../../components/Number/Number';
import EMLogoHeader from '../../../components/EMLogoHeader/EMLogoHeader';

import BankingOnCryptoImage from '../../../../assets/svgs/BankingOnCrypto';
import QuestionImage from '../../../../assets/svgs/Question';
import ChevronBottomBlueImage from '../../../../assets/svgs/ChevronBottomBlue';
import colors from '../../../../styles/colors';

import {
  accountPageBody,
  accPageWrapper as wrapper,
  block,
  blockHeader,
  flexRow,
  subBlockLeft,
  subBlockRight,
  view,
} from '../../../../styles/mixins';
import styles from './Dashboard.styles';

export default observer(({ navigation }) => {
  useFocusEffect(() => statusBar('dark'));

  const [wallets, setWallets] = useState([]);
  const [modalText, setModalText] = useState('');

  useEffect(() => setWallets(Store.wallets.wallets.filter((wallet) => wallet.coin !== 'USD')), [Store.wallets.wallets]);

  const reDirector = (direction) => {
    if (Store.user.tier < 3 || (direction === 'Withdraw Credit' && Store.user.tier < 4)) {
      // eslint-disable-next-line no-unused-expressions
      Store.user.KYCProgress < 3
        ? Alert.alert(
          `To ${direction}`,
          'Please complete the KYC identity verification process first.',
          [
            {
              text: 'Later',
              style: 'cancel',
            },
            {
              text: 'Let\'s do it!',
              onPress: async () => navigation.navigate(ACCOUNT, { screen: ACCOUNT, params: { showPicker: true } }),
            },
          ],
          { cancelable: false },
        )
        : Alert.alert('The data you provided is awaiting verification.');
    } else if (direction === 'Withdraw Credit') {
      navigation.navigate(WITHDRAW_CREDIT);
    } else if (direction === 'Deposit Funds') {
      if (wallets.length > 1) {
        setModalText(direction);
      } else {
        navigation.navigate(DEPOSIT, { coin: wallets[0].coin });
      }
    }
  };

  const closeModal = () => {
    setModalText('');
  };

  const scoreOnPress = (coin) => {
    navigation.navigate(DEPOSIT, { coin });
    closeModal();
  };

  const Chevron = Store.wallets.isSeveralWallets ? <ChevronBottomBlueImage style={styles.chevron} /> : <View />;

  return (
    <>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <EMLogoHeader />
          <LinearGradient
            start={{
              x: 0,
              y: 1,
            }}
            end={{
              x: 1,
              y: 1,
            }}
            locations={[0, 1]}
            colors={[colors.purple, 'rgba(120, 67, 197, 0)']}
            style={styles.shadow}
          />
          <BankingOnCryptoImage style={styles.card} />
          <View style={styles.headerText}>
            <Text allowFontScaling={false} style={styles.bankingOfCryptoText}>Banking of crypto</Text>
            <Text allowFontScaling={false} style={styles.bankingOfCryptoSubText}>
              Earn up to 6% interest on
              {' '}
              {'\n'}
              crypto and up to
              <Text allowFontScaling={false} style={styles.bankingOfCryptoBoldText}>
                {' '}
                12% on
                {'\n'}
                stablecoins
              </Text>
              , paid out daily.
            </Text>
          </View>
        </View>
      </View>
      <View style={{ ...wrapper, marginTop: '-5%' }}>
        <View style={accountPageBody}>
          <View style={view}>
            <View style={block}>
              <View style={flexRow}>
                <View style={subBlockLeft}>
                  <View style={styles.question}>
                    <QuestionImage
                      message="DepositFunds"
                    />
                  </View>
                  <Text allowFontScaling={false} style={styles.blockHeaderText}>Saving Wallet</Text>
                  <View>
                    <View style={styles.valueWrapper}>
                      <Text allowFontScaling={false} style={styles.valueCurrency}>USD </Text>
                      <Number
                        style={styles.value}
                        digit={+Store.wallets.totalSaving}
                        type="usd"
                      />
                    </View>
                    {Chevron}
                  </View>
                </View>
                <View style={subBlockRight}>
                  <Text allowFontScaling={false} style={styles.blockHeaderText}>Credit Line Wallet</Text>
                  <View>
                    <View style={styles.valueWrapper}>
                      <Text allowFontScaling={false} style={styles.valueCurrency}>USD </Text>
                      <Number
                        style={styles.value}
                        digit={+Store.wallets.totalCredit}
                        type="usd"
                      />
                    </View>
                    {Chevron}
                  </View>
                </View>
              </View>
            </View>
            <DefaultButton
              onPress={() => reDirector('Deposit Funds')}
              title="Deposit Funds"
            />
          </View>
          <Indent height={DEVICE_WIDTH <= 360 ? 25 : 35} />
          <View style={view}>
            <View style={block}>
              <View style={blockHeader}>
                <View style={styles.question}>
                  <QuestionImage message="WithdrawCredit" />
                </View>
                <Text allowFontScaling={false} style={styles.blockHeaderText}>Line of Credit</Text>
                <View>
                  <View style={styles.valueWrapper}>
                    <Text allowFontScaling={false} style={styles.valueCurrency}>USD </Text>
                    <Number
                      style={styles.value}
                      digit={Store.wallets.lineOfCredit}
                      type="usd"
                    />
                  </View>
                  {Chevron}
                </View>
              </View>
              <View style={flexRow}>
                <View style={subBlockLeft}>
                  <Text allowFontScaling={false} style={styles.blockHeaderText}>
                    Available Line of Credit
                  </Text>
                  <View>
                    <View style={styles.valueWrapper}>
                      <Text allowFontScaling={false} style={styles.valueCurrency}>USD </Text>
                      <Number
                        style={styles.value}
                        digit={+Store.wallets.totalAvailable}
                        type="usd"
                      />
                    </View>
                    {Chevron}
                  </View>
                </View>
                <View style={subBlockRight}>
                  <Text allowFontScaling={false} style={styles.blockHeaderText}>Credit Utilized</Text>
                  <View>
                    <View style={styles.valueWrapper}>
                      <Text allowFontScaling={false} style={styles.valueCurrency}>USD </Text>
                      <Number
                        style={styles.value}
                        digit={+Store.wallets.totalUtilized}
                        type="usd"
                      />
                    </View>
                    {Chevron}
                  </View>
                </View>
              </View>
            </View>
            <DefaultButton
              title="Withdraw from Line of Credit"
              onPress={() => reDirector('Withdraw Credit')}
            />
            <Indent height={10} />
            {+Store.wallets.totalUtilized > 0 && (
              <DefaultButton
                title="Repay Credit"
                onPress={() => navigation.navigate(REPAY_CREDIT)}
                isLight
              />
            )}
          </View>
        </View>
      </View>
      {!!modalText && (
        <Modal close={closeModal} header={modalText}>
          {wallets.map((wallet) => (
            <Score
              image={<Coin coin={wallet?.coin} />}
              text={wallet?.coin}
              onPress={() => scoreOnPress(wallet?.coin)}
              key={wallet?.coin}
            />
          ))}
        </Modal>
      )}
    </>
  );
});

observer.propTypes = {
  Component: PropTypes.element,
};
