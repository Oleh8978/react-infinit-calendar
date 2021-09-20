import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView, View, TouchableWithoutFeedback, Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import ReactNativeBiometrics from 'react-native-biometrics';

import statusBar from '../../../../utilities/statusBar';

import {
  USE_BIOMETRIC,
  WILL_TUNE_BIOMETRIC,
} from '../../../../constants/storageKeys';
import { USER } from '../../../../constants/navigation/navigators';

import Header from '../../../components/Header/Header';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import Indent from '../../../components/Indent/Indent';
import Notification from '../../../components/Notification/Notification';

import BiometricImage from '../../../../assets/svgs/Biometric';
import { authPageWrapper as wrapper, view } from '../../../../styles/mixins';
import colors from '../../../../styles/colors';

// User can be redirected to this page only if his device supports biometric authentication!
export default function Biometric({ navigation }) {
  useFocusEffect(() => statusBar('light'));

  const [error, setError] = useState('');

  const activate = async () => {
    try {
      await ReactNativeBiometrics.createKeys('Confirm fingerprint').then(
        async (publicKey) => {
          try {
            const res = await ReactNativeBiometrics.createSignature({
              promptMessage: '',
              payload: publicKey.publicKey,
            });
            if (res.success) {
              await AsyncStorage.multiSet([
                [USE_BIOMETRIC, 'true'],
                [WILL_TUNE_BIOMETRIC, 'false'],
              ]);
              await navigation.navigate(USER);
            }
          } catch (e) {
            console.log(e);
          }
        },
      );
    } catch (e) {
      setError('');
    }
  };

  const deactivate = async () => {
    try {
      await AsyncStorage.multiSet([
        [USE_BIOMETRIC, 'false'],
        [WILL_TUNE_BIOMETRIC, 'true'],
      ]);
      await navigation.navigate(USER);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <>
      <SafeAreaView style={wrapper}>
        <Header
          topText={'Activate Biometric \n Authentication'}
          bottomText="Face ID/Touch ID"
          navigation={navigation}
          isLight={false}
        />
        <BiometricImage />
        <View style={view}>
          <DefaultButton onPress={activate} title="Activate" />
          <Indent height={12} />
          <TouchableWithoutFeedback onPress={deactivate}>
            <Text allowFontScaling={false} style={{ color: colors.purple }}>
              Set Up Later in Settings
            </Text>
          </TouchableWithoutFeedback>
          <Indent height={20} />
        </View>
      </SafeAreaView>
      <Notification notification={error} close={() => setError(() => setError(''))} />
    </>
  );
}

Biometric.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
