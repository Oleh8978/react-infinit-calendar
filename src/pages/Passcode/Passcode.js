import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import statusBar from '../../../utilities/statusBar';

import {
  NUMBER_PASSCODE,
  USE_BIOMETRIC,
  WILL_TUNE_BIOMETRIC,
} from '../../../constants/storageKeys';
import { SIGN_TYPE } from '../../../constants/navigation/authenticationScreens';
import { DEVICE_WIDTH } from '../../../constants/constants';

import Header from '../../components/Header/Header';
import DefaultButton from '../../components/DefaultButton/DefaultButton';
import Notification from '../../components/Notification/Notification';

import DeleteImage from '../../../assets/svgs/Delete';
import { view, header } from '../../../styles/mixins';
import colors from '../../../styles/colors';
import styles from './Passcode.styles';

export default function Passcode({
  navigation,
  route: {
    params: { nextPage, isNew = false },
  },
}) {
  useFocusEffect(() => statusBar('dark'));
  const passcodeKeys = ['k1', 'k2', 'k3', 'k4'];

  const numbers = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 0 },
  ];

  const emptyPasscode = ['', '', '', ''];
  const [passcode, setPasscode] = useState(emptyPasscode);
  const [passcodeStorage, updatePasscodeStorage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isNew) {
      (async () => updatePasscodeStorage(await AsyncStorage.getItem(NUMBER_PASSCODE)))();
    }

    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });
    return () => parent.setOptions({
      tabBarVisible: true,
    });
  }, []);

  const onPressNumber = (num) => {
    const tempCode = passcode.slice();

    for (let i = 0; i < tempCode.length; i++) {
      if (tempCode[i] === '') {
        tempCode[i] = num;
        break;
      }
    }
    setPasscode(tempCode);
  };

  const deleteLastNumber = () => {
    const tempCode = passcode.slice();

    for (let i = tempCode.length - 1; i >= 0; i--) {
      if (tempCode[i] !== '') {
        tempCode[i] = '';
        break;
      }
    }
    setPasscode(tempCode);
  };

  const onPressDone = async () => {
    try {
      const StoragePasscode = passcode.toString();
      if (passcode.every((num) => typeof num === 'number')) {
        await AsyncStorage.multiSet([
          [NUMBER_PASSCODE, StoragePasscode],
          [USE_BIOMETRIC, 'true'],
        ]);
        await navigation.navigate(nextPage);
        setTimeout(() => updatePasscodeStorage(emptyPasscode), 100);
      } else {
        setError('Passcode must be at least 4 characters!');
      }
    } catch (e) {
      setError(e);
    }
  };

  const onPressNext = async () => {
    try {
      if (passcodeStorage === passcode.toString()) {
        await navigation.navigate(nextPage);
        updatePasscodeStorage(emptyPasscode);
      } else {
        setError(
          passcode.toString().replaceAll(',', '').length < 4
            ? 'Passcode must be at least 4 characters!'
            : 'Please, write correct passcode!',
        );
      }
    } catch (e) {
      setError(e);
    }
  };

  const onPressDoItLater = async () => {
    try {
      await navigation.navigate(nextPage);
      await AsyncStorage.multiSet([
        [USE_BIOMETRIC, 'false'],
        [WILL_TUNE_BIOMETRIC, 'true'],
      ]);
    } catch (e) {
      setError(e);
    }
  };

  const signInManually = async () => {
    await navigation.navigate(SIGN_TYPE, { type: 'registration' });
    setPasscode(emptyPasscode);
  };

  return (
    <>
      <SafeAreaView>
        <View style={{ ...view, backgroundColor: colors.white, marginTop: 15 }}>
          <View style={header}>
            <StatusBar />
            <Header
              deviceMarginTop={30}
              topText={passcodeStorage ? 'Enter Passcode' : 'Create Passcode'}
              navigation={navigation}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.codeContainer}>
              {passcode.map((p, i) => (
                <View
                  style={p !== '' ? styles.codeFill : styles.codeTransparent}
                  key={passcodeKeys[i]}
                />
              ))}
            </View>
            <View style={styles.numberContainerWrapper}>
              <View style={styles.numberContainer}>
                {numbers.map((num) => (
                  <TouchableOpacity
                    style={styles.number}
                    key={num.id}
                    onPress={() => onPressNumber(num.id)}
                  >
                    <Text allowFontScaling={false} style={styles.numberText}>{num.id}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={styles.number}
                  onPress={deleteLastNumber}
                >
                  <View style={styles.numberText}>
                    <DeleteImage />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              {passcodeStorage === null ? (
                <DefaultButton onPress={onPressDone} title="DONE" isSmall />
              ) : (
                <DefaultButton onPress={onPressNext} title="NEXT" isSmall />
              )}
              {passcodeStorage === null ? (
                <DefaultButton
                  onPress={onPressDoItLater}
                  title="Do It Later"
                  isSmall
                />
              ) : (
                <DefaultButton
                  onPress={signInManually}
                  title="Sign in manually"
                  isSmall
                  textStyles={{ fontSize: DEVICE_WIDTH <= 360 ? 10 : 15 }}
                />
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
      <Notification notification={error} close={() => setError('')} />
    </>
  );
}

Passcode.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      nextPage: PropTypes.string,
      isNew: PropTypes.bool,
    }),
  }),
};
