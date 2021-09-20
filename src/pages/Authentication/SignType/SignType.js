import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Text, TouchableOpacity, View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth, Hub } from 'aws-amplify';

import statusBar from '../../../../utilities/statusBar';
import {
  AUTHENTICATION,
  USER,
} from '../../../../constants/navigation/navigators';
import {
  BIOMETRIC,
  CREATE_USER_EMAIL,
  SIGN_IN_USER_EMAIL,
} from '../../../../constants/navigation/authenticationScreens';
import { WILL_TUNE_BIOMETRIC } from '../../../../constants/storageKeys';

import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Notification from '../../../components/Notification/Notification';
import Loader from '../../../components/Loader/Loader';

import GoogleImage from '../../../../assets/svgs/Google';
import FacebookImage from '../../../../assets/svgs/Facebook';
import AppleImage from '../../../../assets/svgs/Apple';
import EmailImage from '../../../../assets/svgs/Email';

import {
  authPageWrapper as wrapper,
  shadowBlock,
  view,
} from '../../../../styles/mixins';
import styles from './SignType.styles';
import colors from '../../../../styles/colors';

function SignType({ navigation, route: { params: type } }) {
  useFocusEffect(() => statusBar('light'));

  const isLogin = type.type === 'login';
  const [showLoader, setShowLoader] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    Hub.listen(/.*/, async (data) => {
      if (data.payload.event === 'parsingCallbackUrl') {
        setShowLoader(true);
      } else if (data.payload.event === 'cognitoHostedUI') {
        try {
          await Auth.currentAuthenticatedUser();
          try {
            if (
              !((await AsyncStorage.getItem(WILL_TUNE_BIOMETRIC)) === 'true')
            ) {
              navigation.navigate(AUTHENTICATION, { screen: BIOMETRIC });
            } else {
              await navigation.navigate(USER);
            }
            setLoginError('');
          } catch (e) {
            setLoginError(e);
          }
        } catch (_e) {
          setLoginError(_e);
        }
        setShowLoader(false);
      }
    });
  }, []);

  const authentication = async (provider) => {
    try {
      await Auth.federatedSignIn({ provider });
    } catch (e) {
      setLoginError(e);
    }
  };

  if (showLoader) {
    return (
      <View style={{
        width: '100%',
        height: '100%',
        backgroundColor: colors.white,
      }}
      >
        <Loader color={colors.purple} isAbsolute size="large" />
      </View>
    );
  }

  return (
    <>
      <View style={wrapper}>
        <Header
          navigation={navigation}
          topText={isLogin ? 'Sign in Your Account' : 'Create Your Account'}
          bottomText={`How do you want to sign ${isLogin ? 'in' : 'up'}`}
          isLight={false}
        />
        <View />
        <View style={view}>
          <TouchableOpacity
            style={shadowBlock}
            onPress={() => authentication('SignInWithApple')}
          >
            <AppleImage style={styles.logo} />
            <Text allowFontScaling={false} style={styles.signUpText}>{`Sign ${isLogin ? 'in' : 'up'} with Apple`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={shadowBlock}
            onPress={() => authentication('Google')}
          >
            <GoogleImage style={styles.logo} />
            <Text allowFontScaling={false} style={styles.signUpText}>{`Sign ${isLogin ? 'in' : 'up'} with Google`}</Text>
          </TouchableOpacity>
          <View style={{ ...shadowBlock, opacity: 0.25 }}>
            <FacebookImage style={styles.logo} />
            <Text allowFontScaling={false} style={styles.signUpText}>{`Sign ${isLogin ? 'in' : 'up'} with Facebook`}</Text>
          </View>
          <TouchableOpacity
            style={shadowBlock}
            onPress={() => navigation.navigate(AUTHENTICATION, { screen: isLogin ? SIGN_IN_USER_EMAIL : CREATE_USER_EMAIL })}
          >
            <EmailImage style={styles.logo} />
            <Text allowFontScaling={false} style={styles.signUpText}>{`Sign ${isLogin ? 'in' : 'up'} with Email`}</Text>
          </TouchableOpacity>
        </View>
        <View />
        {!isLogin && <View style={{ position: 'absolute', bottom: 25 }}><Footer isContactSupport={false} navigation={navigation} /></View>}
        <View />
      </View>
      <Notification type="error" notification={loginError} close={() => setLoginError('')} />
    </>
  );
}

export default SignType;

SignType.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
