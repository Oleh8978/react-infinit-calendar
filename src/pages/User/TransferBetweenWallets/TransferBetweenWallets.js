import React, {
  useEffect, useState, useMemo,
} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import * as yup from 'yup';

import statusBar from '../../../../utilities/statusBar';
import Store from '../../../store';
import transfer from '../../../../services/transfer';
import crypto from '../../../../utilities/formatters/cryptoFormatter';
import usd from '../../../../utilities/formatters/usdFormatter';
import { amountValidator } from '../../../../utilities/yupValidators';
import amountFormatter from '../../../../utilities/formatters/amountFormatter';

import {
  BTC_FRACTAL_SYMBOLS,
  ETH_FRACTAL_SYMBOLS,
} from '../../../../constants/constants';

import KeyboardNormalizerScrolling from '../../../HOCs/KeyboardNormalizerScrolling';
import Header from '../../../components/Header/Header';
import EMLogoHeader from '../../../components/EMLogoHeader/EMLogoHeader';
import FormInput from '../../../components/FormInput/FormInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import Coin from '../../../components/Coin/Coin';
import Indent from '../../../components/Indent/Indent';
import Notification from '../../../components/Notification/Notification';

import ChevronLeftWhiteImage from '../../../../assets/svgs/ChevronLeftWhite';
import TransferImage from '../../../../assets/svgs/TransferBetween';

import {
  customHeader,
  block,
  blockHeader,
  flexRow,
  greyFormInput,
  inputCurrency,
  view,
} from '../../../../styles/mixins';

import styles from './TransferBetweenWallets.styles';
import colors from '../../../../styles/colors';

export default KeyboardNormalizerScrolling(
  observer(({ navigation, route: { params: coin } }) => {
    useFocusEffect(() => statusBar('dark'));

    const animation = useMemo(() => new Animated.Value(0), []);

    const [savingValue, setSavingValue] = useState(0);
    const [creditValue, setCreditValue] = useState(0);

    const [exchangeRate, setExchangeRate] = useState(0);
    const [walletName, setWalletName] = useState('');
    const [fromDirection, setFromDirection] = useState('Saving Balance');
    const [toDirection, setToDirection] = useState('Credit Line Balance');
    const [formError, setFormError] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [activatedAnimation, setIsActivatedAnimation] = useState(false);

    useEffect(() => {
      const coinName = coin?.coin || coin;
      setExchangeRate(Store.wallets.exchangeRates[coinName]);
      setWalletName(coinName);

      const currentWallet = Store.wallets.wallets.find((w) => w.coin === coinName)
        ?.wallet;
      setSavingValue(currentWallet?.saving);
      setCreditValue(currentWallet?.credit_line);
    }, [coin, Store.wallets.wallets]);

    useEffect(() => {
      const parent = navigation.dangerouslyGetParent();
      parent.setOptions({
        tabBarVisible: false,
      });
    }, []);

    const swapDirection = () => {
      setFromDirection(toDirection);
      setToDirection(fromDirection);
      setIsActivatedAnimation(!activatedAnimation);

      Animated.timing(animation, {
        toValue: activatedAnimation ? 0 : 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
      Animated.timing(animation, {
        toValue: activatedAnimation ? 0 : -1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    };

    const spin = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    const onTransfer = async (values, { resetForm }) => {
      try {
        setShowLoader(true);
        const _from = fromDirection === 'Saving Balance' ? 'saving' : 'credit_line';
        const _to = toDirection === 'Credit Line Balance' ? 'credit_line' : 'saving';
        await transfer(walletName, _from, _to, values.amount);

        await Store.wallets.updateAllData();
        resetForm();
        await Store.application.addNotification('Funds Transferred');
        setFormError('');
      } catch (e) {
        setFormError(e);
      }
      setShowLoader(false);
    };

    return (
      <>
        <View style={{ height: '103%' }}>
          <View style={customHeader}>
            <EMLogoHeader />
            <Header
              navigation={navigation}
              topText={'Transfer funds \n between Wallets'}
              goBack={false}
            />
          </View>
          <ScrollView
            style={{ maxWidth: '100%', position: 'relative', top: -20 }}
            contentContainerStyle={{ paddingTop: 165 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ ...view, paddingHorizontal: '5%' }}>
              <View style={block}>
                <View style={blockHeader}>
                  <View style={flexRow}>
                    <Text allowFontScaling={false}>
                      <Text
                        allowFontScaling={false}
                        style={
                                {
                                  fontFamily: 'OpenSans-Bold',
                                  color: colors.black,
                                }
                              }
                      >
                        From
                        {' '}
                      </Text>
                      <Text>{fromDirection}</Text>
                    </Text>
                    <Coin coin={coin.coin} />
                  </View>
                </View>
                <View style={styles.subBlockHeader}>
                  <Text style={styles.value}>
                    <Text style={styles.valueCurrency}>{`${walletName} `}</Text>
                    {crypto(
                      fromDirection === 'Saving Balance'
                        ? savingValue
                        : creditValue,
                    )}
                  </Text>
                  <Text style={styles.valueGrey}>
                    {` USD ${usd(
                      (fromDirection === 'Saving Balance'
                        ? +savingValue
                        : +creditValue) * +exchangeRate,
                    )}`}
                  </Text>
                </View>
              </View>
              <TouchableWithoutFeedback onPress={swapDirection}>
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <TransferImage />
                </Animated.View>
              </TouchableWithoutFeedback>
              <Indent height={20} />
              <View style={block}>
                <View style={blockHeader}>
                  <View style={flexRow}>
                    <Text allowFontScaling={false}>
                      <Text
                        allowFontScaling={false}
                        style={
                          {
                            fontFamily: 'OpenSans-Bold',
                            color: colors.black,
                          }
                        }
                      >
                        To
                        {' '}
                      </Text>
                      <Text allowFontScaling={false}>{toDirection}</Text>
                    </Text>
                    <Coin coin={coin.coin} />
                  </View>
                </View>
                <View style={styles.subBlockHeader}>
                  <Text allowFontScaling={false} style={styles.value}>
                    <Text allowFontScaling={false} style={styles.valueCurrency}>{`${walletName} `}</Text>
                    {crypto(
                      toDirection === 'Credit Line Balance'
                        ? creditValue
                        : savingValue,
                    )}
                  </Text>
                  <Text allowFontScaling={false} style={styles.valueGrey}>
                    {` USD ${usd(
                      (toDirection === 'Credit Line Balance'
                        ? +creditValue
                        : +savingValue) * +exchangeRate,
                    )}`}
                  </Text>
                </View>
              </View>
            </View>
            <Formik
              validationSchema={yup.object().shape({
                amount: amountValidator,
              })}
              initialValues={{
                amount: '',
              }}
              onSubmit={onTransfer}
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
                <View style={styles.body}>
                  <View style={view}>
                    <Text allowFontScaling={false} style={styles.text}>Amount</Text>
                    <View style={view}>
                      <FormInput
                        keyboardType="numeric"
                        set={(amount) => {
                          amountFormatter(
                            amount,
                            handleChange('amount'),
                            walletName === 'BTC'
                              ? BTC_FRACTAL_SYMBOLS
                              : walletName === 'ETH'
                                ? ETH_FRACTAL_SYMBOLS
                                : 2,
                          );
                        }}
                        onBlur={handleBlur('amount')}
                        value={values.amount}
                        error={touched.amount && errors.amount}
                        style={{ ...greyFormInput, paddingRight: 45 }}
                      />
                      <Text allowFontScaling={false} style={inputCurrency}>{walletName}</Text>
                    </View>
                  </View>
                  <View style={styles.amountRate}>
                    <Text allowFontScaling={false} style={styles.valueGrey}>
                      {`USD ${usd(values.amount * exchangeRate)}`}
                    </Text>
                  </View>
                  <Indent height={20} />
                  <DefaultButton
                    title="Transfer funds"
                    onPress={handleSubmit}
                    disabled={!(isValid && dirty)}
                    showLoader={showLoader}
                  />
                  <Indent height={20} />
                  <DefaultButton
                    title="Cancel"
                    isLight
                    onPress={() => navigation.goBack()}
                  />
                </View>
              )}
            </Formik>
          </ScrollView>
          <View style={styles.goBack}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeftWhiteImage />
            </TouchableOpacity>
          </View>
        </View>
        <Notification notification={formError} close={() => setFormError('')} />
      </>
    );
  }),
);
