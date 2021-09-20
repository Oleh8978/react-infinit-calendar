import React, {
  useEffect, useState, useRef,
} from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import statusBar from '../../../../utilities/statusBar';
import resendConfirmationLink from '../../../../services/cognito/resendConfirmationLink';

import { AUTHENTICATION } from '../../../../constants/navigation/navigators';
import {
  SIGN_IN_USER_EMAIL,
  SIGN_TYPE,
} from '../../../../constants/navigation/authenticationScreens';

import Header from '../../../components/Header/Header';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import Indent from '../../../components/Indent/Indent';
import Notification from '../../../components/Notification/Notification';

import ConfirmEmailAddressImage from '../../../../assets/svgs/ConfirmEmailAddress';
import { authPageWrapper as wrapper, view } from '../../../../styles/mixins';
import styles from './ConfirmEmailAddress.styles';

const TIMER = 60;

export default function ConfirmEmailAddress({ navigation, route }) {
  useFocusEffect(() => statusBar('light'));

  const [resendError, setResendError] = useState('');
  const [timer, setTimer] = useState(TIMER);
  const [showTimer, setShowTimer] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      } else {
        setTimeout(() => setShowTimer(false));
        clearInterval(intervalRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [timer]);

  const resendEmail = async () => {
    try {
      setShowLoader(true);
      await resendConfirmationLink(route?.params?.username);
      setResendError('');
      setTimer(TIMER);
      setShowTimer(true);
    } catch (e) {
      setResendError(e);
    }
    setShowLoader(false);
  };

  return (
    <View style={wrapper}>
      <Header
        goBackFunction={() => navigation.navigate(AUTHENTICATION, { screen: SIGN_TYPE, params: { type: 'registration' } })}
        topText="Confirm Email Address"
        bottomText={route?.params?.username}
        navigation={navigation}
        isLight={false}
      />
      <ConfirmEmailAddressImage />
      <View style={styles.textWrapper}>
        <Text allowFontScaling={false} style={styles.mainText}>
          Please check your email for the confirmation link.
        </Text>
        <Text allowFontScaling={false} style={styles.subText}>
          If you do not receive a confirmation email, please check your spam
          folder or request a new one.
        </Text>
      </View>
      <View style={view}>
        <View>
          {showTimer && <Text allowFontScaling={false} style={styles.timer}>{timer}</Text>}
          <DefaultButton
            onPress={resendEmail}
            showLoader={showLoader}
            disabled={showTimer}
            title="Resend Confirmation Link"
          />
        </View>
        <Indent height={20} />
        <DefaultButton
          onPress={() => {
            navigation.push(SIGN_IN_USER_EMAIL);
            clearInterval(intervalRef.current);
          }}
          title="Back to Login"
        />
      </View>
      <View />
      <Notification
        notification={resendError}
        close={() => setResendError('')}
      />
    </View>
  );
}

ConfirmEmailAddress.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.object,
};
