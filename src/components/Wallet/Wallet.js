import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { observer } from 'mobx-react-lite';

import Number from '../Number/Number';
import Coin from '../Coin/Coin';

import Store from '../../store';

import { WALLET_INFORMATION } from '../../../constants/navigation/userScreens';

import ArrowImage from '../../../assets/svgs/ChevronRightBlue';

import {
  block, blockHeader, flexRow, subBlockLeft, subBlockRight,
} from '../../../styles/mixins';
import styles from './Wallet.styles';
import colors from '../../../styles/colors';

export default observer(({
  navigation,
  coin,
  isFull = false,
  balance = 'Saving Balance',
}) => {
  const [wallet, setWallet] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    setExchangeRate(Store.wallets.exchangeRates[coin]);
    setWallet(Store.wallets.wallets.find((_wallet) => _wallet?.coin === coin)?.wallet);
  }, [coin, Store.wallets.wallets, Store.wallets.exchangeRates[coin]]);

  const onPress = () => {
    if (!isFull) navigation.navigate(WALLET_INFORMATION, { coin });
  };

  const isSavingBalance = balance === 'Saving Balance';

  if (!wallet) return <></>;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={block}>
        <View style={styles.header}>
          <View style={styles.currencyLogo}>
            <Coin coin={coin} />
          </View>
          <Text allowFontScaling={false} style={styles.type}>{coin}</Text>
          {!isFull ? <ArrowImage style={styles.arrow} /> : <View />}
        </View>
        {isFull ? (
          <View style={flexRow}>
            <View style={{
              ...subBlockLeft,
              alignItems: 'flex-start',
            }}
            >
              <Text allowFontScaling={false} style={{ color: colors.black }}>Own</Text>
              <Text allowFontScaling={false} style={styles.topValue}>
                <Text allowFontScaling={false} style={styles.topValueCurrency}>{coin}</Text>
                {' '}
                <Number digit={+wallet?.saving} type="crypto" style={styles.topValue} />
              </Text>
              <Text allowFontScaling={false} style={styles.bottomValue}>
                USD
                {' '}
                <Number
                  digit={+wallet?.saving * +exchangeRate}
                  type="usd"
                  style={styles.bottomValue}
                />
              </Text>
            </View>
            <View style={{
              ...subBlockRight,
              alignItems: 'flex-start',
            }}
            >
              <Text allowFontScaling={false} style={{ color: colors.black }}>Credit</Text>
              <Text allowFontScaling={false} style={styles.topValue}>
                <Text allowFontScaling={false} style={styles.topValueCurrency}>{coin}</Text>
                {' '}
                <Number digit={wallet?.credit_line} type="crypto" style={styles.topValue} />
              </Text>
              <Text allowFontScaling={false} style={styles.bottomValue}>
                USD
                {' '}
                <Number
                  digit={+wallet?.credit_line * +exchangeRate}
                  type="usd"
                  style={styles.bottomValue}
                />
              </Text>
            </View>
          </View>
        ) : (
          <View style={{ ...blockHeader, ...flexRow }}>
            <Text allowFontScaling={false} style={{ color: colors.black }}>{balance}</Text>
            <Text allowFontScaling={false} style={styles.topValue}>
              <Text allowFontScaling={false} style={styles.topValueCurrency}>{coin}</Text>
              {' '}
              <Number
                digit={isSavingBalance ? +wallet?.saving : +wallet?.credit_line}
                type="crypto"
                style={styles.topValue}
              />
            </Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
});

observer.propTypes = {
  Component: PropTypes.element,
};
