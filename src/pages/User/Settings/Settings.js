import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Platform, Switch, Text, TouchableWithoutFeedback, View, SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';

import Store from '../../../store';
import statusBar from '../../../../utilities/statusBar';
import { CHANGE_PASSWORD, SETTINGS } from '../../../../constants/navigation/userScreens';
import {
  AUTOMATIC_COLLATERAL_TRANSFER,
  NUMBER_PASSCODE,
  USE_BIOMETRIC,
  WILL_TUNE_BIOMETRIC,
} from '../../../../constants/storageKeys';
import { PASSCODE } from '../../../../constants/navigation/authenticationScreens';
import { version } from '../../../../package.json';

import Header from '../../../components/Header/Header';
import EMLogoHeader from '../../../components/EMLogoHeader/EMLogoHeader';
import Indent from '../../../components/Indent/Indent';

import ArrowRightImage from '../../../../assets/svgs/ArrowRight';
import {
  authPageWrapper as wrapper, formWrapper, shadow, smallHeader, whiteButton,
} from '../../../../styles/mixins';
import colors from '../../../../styles/colors';
import styles from './Settings.styles';

export default function Settings({ navigation }) {
  useFocusEffect(() => statusBar('dark'));

  const [biometric, setBiometric] = useState(false);
  const [autoCollateral, setAutoCollateral] = useState(false);

  useEffect(() => {
    (async () => {
      setBiometric((await AsyncStorage.getItem(USE_BIOMETRIC)) === 'true');
      setAutoCollateral(
        (await AsyncStorage.getItem(AUTOMATIC_COLLATERAL_TRANSFER)) === 'true',
      );
    })();
  }, []);

  const changeBiometric = async () => {
    try {
      const { available } = await ReactNativeBiometrics.isSensorAvailable();
      await AsyncStorage.removeItem(NUMBER_PASSCODE);
      if (biometric) {
        setBiometric(false);
        await AsyncStorage.multiSet([
          [USE_BIOMETRIC, 'false'],
          [WILL_TUNE_BIOMETRIC, 'false'],
        ]);
      } else if (available) {
        setBiometric(true);
        await ReactNativeBiometrics.createKeys('Confirm fingerprint').then(
            async (publicKey) => {
              try {
                const res = await ReactNativeBiometrics.createSignature({
                  promptMessage: '',
                  payload: publicKey.publicKey,
                });
                if (res.success) {
                  setBiometric(true);
                  await AsyncStorage.multiSet([
                    [USE_BIOMETRIC, 'true'],
                    [WILL_TUNE_BIOMETRIC, 'false'],
                  ]);
                } else {
                  setBiometric(false);
                }
              } catch (e) {
                setBiometric(false);
              }
            },
        );
      } else {
        await navigation.navigate(PASSCODE, { nextPage: SETTINGS });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const changeAutoCollateral = async () => {
    setAutoCollateral((prev) => !prev);
    await AsyncStorage.setItem(
      AUTOMATIC_COLLATERAL_TRANSFER,
      `${!autoCollateral}`,
    );
  };

  return (
    <>
      <View style={smallHeader}>
        <EMLogoHeader />
        <Indent height={20} />
        <Header topText="Settings" navigation={navigation} />
        <Indent height={20} />
      </View>
      <View style={wrapper}>
        <SafeAreaView
          style={{
            ...formWrapper,
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Indent height={17} />
            {!Store.user.provider ? (
              <>
                <TouchableWithoutFeedback onPress={() => navigation.navigate(CHANGE_PASSWORD)}>
                  <View style={{ ...whiteButton, ...shadow }}>
                    <Text allowFontScaling={false} style={{ color: colors.black }}>Change password</Text>
                    <ArrowRightImage />
                  </View>
                </TouchableWithoutFeedback>
              </>
            )
              : (<></>)}
            <TouchableWithoutFeedback onPress={changeBiometric}>
              <View style={whiteButton}>
                <View>
                  <Text allowFontScaling={false} style={styles.topText}>Biometric Authentication</Text>
                  <Text allowFontScaling={false} style={styles.bottomText}>
                    {biometric ? 'Enabled' : 'Disabled'}
                  </Text>
                </View>
                <Switch
                  style={Platform.OS === 'android'
                    ? { transform: [{ scaleX: 1.1 }, { scaleY: 1 }] }
                    : { transform: [{ scaleX: 0.8 }, { scaleY: 0.7 }] }}
                  trackColor={{ true: colors.purple, false: colors.greyLight }}
                  thumbColor={biometric ? colors.white : colors.white}
                  onValueChange={changeBiometric}
                  value={biometric}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={changeAutoCollateral}>
              <View style={whiteButton}>
                <View>
                  <Text allowFontScaling={false} style={styles.topText}>
                    Automatic Collateral Transfer
                  </Text>
                  <Text allowFontScaling={false} style={styles.bottomText}>
                    {autoCollateral ? 'Enabled' : 'Disabled'}
                  </Text>
                </View>
                <Switch
                  style={Platform.OS === 'android'
                    ? { transform: [{ scaleX: 1.1 }, { scaleY: 1 }] }
                    : { transform: [{ scaleX: 0.8 }, { scaleY: 0.7 }] }}
                  trackColor={{ true: colors.purple, false: colors.greyLight }}
                  thumbColor={biometric ? colors.white : colors.white}
                  onValueChange={changeAutoCollateral}
                  value={autoCollateral}
                />
              </View>
            </TouchableWithoutFeedback>
            <Text allowFontScaling={false} style={styles.automaticCollateralText}>
              When Automatic Collateral Transfer is enabled, Rhino automatically transfers a percentage of
              assets
              from the Own Savings to the Line of Credit wallets.
              It’s done to cover the gap.
            </Text>
          </View>
          <View>
            <TouchableWithoutFeedback>
              <View style={whiteButton}>
                <View>
                  <Text allowFontScaling={false} style={styles.topText}>App version</Text>
                  <Text allowFontScaling={false} style={styles.bottomText}>{version}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <Indent height={40} />
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
