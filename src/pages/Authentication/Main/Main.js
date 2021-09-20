import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView, Text, View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth } from 'aws-amplify';

import statusBar from '../../../../utilities/statusBar';

import { AUTHENTICATION, USER } from '../../../../constants/navigation/navigators';
import { PASSCODE, SIGN_TYPE } from '../../../../constants/navigation/authenticationScreens';
import { USE_BIOMETRIC, NUMBER_PASSCODE } from '../../../../constants/storageKeys';

import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import Footer from '../../../components/Footer/Footer';
import Notification from '../../../components/Notification/Notification';

import EMLogoImage from '../../../../assets/svgs/EMLogo';
import EMLogoTextImage from '../../../../assets/svgs/EMLogoText';
import { view } from '../../../../styles/mixins';
import styles from './Main.styles';

export default function Main({ navigation }) {
  useFocusEffect(() => statusBar('dark'));

  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        if (await Auth.currentAuthenticatedUser() && await AsyncStorage.getItem(USE_BIOMETRIC) === 'true') {
          if ((await ReactNativeBiometrics.isSensorAvailable()).available) {
            await ReactNativeBiometrics.createKeys('Confirm fingerprint').then(
              async (publicKey) => {
                try {
                  const res = await ReactNativeBiometrics.createSignature({
                    promptMessage: 'To login confirm your fingerprint',
                    payload: publicKey.publicKey,
                  });
                  if (res.success) {
                    await navigation.navigate(USER);
                  }
                } catch (e) {
                  console.log(e);
                }
              },
            );
          } else if ((await AsyncStorage.getItem(NUMBER_PASSCODE))?.length) {
            await navigation.navigate(PASSCODE, { nextPage: USER });
          }
        }
      } catch (e) {
        setError('');
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <View />
      <View style={view}>
        <EMLogoImage style={styles.logo} />
        <Text style={styles.textsWrapper}>
          <Text style={styles.welcome}>{'Welcome to \n'}</Text>
          <EMLogoTextImage style={styles.logoText} />
        </Text>
        <Text style={styles.test}>TEST</Text>
        <DefaultButton
          title="Let’s Get Started"
          onPress={() => navigation.navigate(AUTHENTICATION, { screen: SIGN_TYPE, params: { type: 'registration' } })}
          isLight
        />
      </View>
      <Footer isLight navigation={navigation} />
      <Notification notification={error} close={() => setError('')} />
    </SafeAreaView>
  );
}

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
