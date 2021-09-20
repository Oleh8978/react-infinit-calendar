import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import statusBar from '../../../../utilities/statusBar';
import Store from '../../../store';

import {
  ACCOUNT,
  DEPOSIT,
  TRANSFER_BETWEEN_WALLETS,
  WITHDRAW,
} from '../../../../constants/navigation/userScreens';
import { DEVICE_WIDTH } from '../../../../constants/constants';

import Header from '../../../components/Header/Header';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import Indent from '../../../components/Indent/Indent';
import Number from '../../../components/Number/Number';
import Coin from '../../../components/Coin/Coin';

import {
  block,
  subBlockLeft,
  subBlockRight,
  flexRow,
  view,
} from '../../../../styles/mixins';
import styles from './WalletInformation.styles';

export default observer(
  ({
    navigation,
    route: {
      params: { coin },
    },
  }) => {
    useFocusEffect(() => statusBar('light'));

    useEffect(() => {
      const parent = navigation.dangerouslyGetParent();
      parent.setOptions({
        tabBarVisible: false,
      });
      return () => parent.setOptions({
        tabBarVisible: true,
      });
    }, []);

    const [exchangeRate, setExchangeRate] = useState(1);
    const [wallet, setWallet] = useState(null);

    useEffect(() => {
      setExchangeRate(Store.wallets.exchangeRates[coin]);
      setWallet(Store.wallets.wallets.find((_wallet) => _wallet?.coin === coin)?.wallet);
    }, [coin, Store.wallets.wallets, Store.wallets.exchangeRates[coin]]);

    const reDirector = (direction) => {
      if ((direction !== 'Deposit' && Store.user.tier < 4) || (Store.user.tier < 3)) {
        Alert.alert(
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
        );
      } else {
        switch (direction) {
          case 'Deposit':
            return navigation.navigate(DEPOSIT, { coin, isParentTabBar: false });
          case 'Withdraw':
            return navigation.navigate(WITHDRAW, { coin });
          case 'Transfer Funds between Wallets':
            return navigation.navigate(TRANSFER_BETWEEN_WALLETS, { coin });
          default:
            return Alert.alert('Something went wrong');
        }
      }
    };

    if (!wallet) {
      return <></>;
    }

    return (
      <View style={styles.wrapper}>
        <View style={view}>
          <Indent height={20} />
          <Header navigation={navigation} topText={coin} isLight={false} />
          <Coin coin={coin} isBig />
          <Text allowFontScaling={false} style={styles.walletValues}>
            <Text allowFontScaling={false} style={styles.currency}>{`${coin} `}</Text>
            <Text allowFontScaling={false} style={styles.valueBold}>
              <Number
                digit={+wallet?.saving}
                type="crypto"
                style={styles.valueBold}
              />
            </Text>
          </Text>
          <Indent height={DEVICE_WIDTH <= 360 ? 10 : 25} />
          <View style={block}>
            <View style={flexRow}>
              <View style={{ ...subBlockLeft, alignItems: 'flex-start' }}>
                <Text allowFontScaling={false} style={styles.blockHeaderText}>Saving Balance</Text>
                <Text allowFontScaling={false} style={styles.value}>
                  <Text allowFontScaling={false}>{`${coin} `}</Text>
                  <Number
                    digit={+wallet?.saving}
                    type="crypto"
                    style={styles.value}
                  />
                </Text>
                <Text allowFontScaling={false} style={styles.greyText}>
                  USD
                  {' '}
                  <Number
                    digit={+wallet?.saving * +exchangeRate}
                    type="usd"
                    style={styles.greyText}
                  />
                </Text>
              </View>
              <View style={{ ...subBlockRight, alignItems: 'flex-start' }}>
                <Text allowFontScaling={false} style={styles.blockHeaderText}>Credit Line Balance</Text>
                <Text allowFontScaling={false} style={styles.value}>
                  <Text allowFontScaling={false}>{`${coin} `}</Text>
                  <Number
                    digit={+wallet?.credit_line}
                    type="crypto"
                    style={styles.value}
                  />
                </Text>
                <Text allowFontScaling={false} style={styles.greyText}>
                  USD
                  {' '}
                  <Number
                    digit={+wallet?.credit_line * +exchangeRate}
                    type="usd"
                    style={styles.greyText}
                  />
                </Text>
              </View>
            </View>
          </View>
          <View style={block}>
            <View style={flexRow}>
              <View style={{ ...subBlockLeft, alignItems: 'flex-start' }}>
                <Text allowFontScaling={false} style={styles.blockHeaderText}>Line of Credit</Text>
                <Text allowFontScaling={false}>
                  <Text allowFontScaling={false} style={styles.valueBold}>USD </Text>
                  <Number
                    digit={(wallet?.credit_line * exchangeRate) / 2}
                    type="usd"
                    style={styles.valueBold}
                    limitedSpace
                  />
                </Text>
              </View>
              <View style={{ ...subBlockRight, alignItems: 'flex-start' }}>
                <Text allowFontScaling={false} style={styles.blockHeaderText}>Credit Utilized</Text>
                <Text allowFontScaling={false}>
                  <Text allowFontScaling={false} style={styles.valueBold}>USD </Text>
                  {/* TODO: IT WORKS ONLY WITH ONE WALLET */}
                  <Number
                    digit={+Store.wallets.totalUtilized}
                    type="usd"
                    style={styles.valueBold}
                  />
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <DefaultButton
            customStyles={styles.button}
            onPress={() => reDirector('Deposit')}
            title="Deposit"
          />
          <DefaultButton
            customStyles={styles.button}
            onPress={() => reDirector('Withdraw')}
            title="Withdraw"
            isLight
          />
          <DefaultButton
            customStyles={styles.button}
            onPress={() => reDirector('Transfer Funds between Wallets')}
            textStyles={{ fontSize: 15 }}
            title="Transfer Funds between Wallets"
            isLight
          />
        </View>
      </View>
    );
  },
);

observer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      coin: PropTypes.shape(PropTypes.object),
    }),
  }),
};
