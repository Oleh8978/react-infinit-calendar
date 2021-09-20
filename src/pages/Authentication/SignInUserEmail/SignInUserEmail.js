import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Keyboard,
  Platform,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import ReactNativeBiometrics from 'react-native-biometrics';

import statusBar from '../../../../utilities/statusBar';
import signInUser from '../../../../services/cognito/signInUserThroughEmail';
import {
  emailValidator,
  passwordValidator,
} from '../../../../utilities/yupValidators';

import {
  AUTHENTICATION,
  USER,
} from '../../../../constants/navigation/navigators';
import {
  BIOMETRIC,
  FORGOT_PASSWORD,
  PASSCODE,
} from '../../../../constants/navigation/authenticationScreens';
import { USE_BIOMETRIC } from '../../../../constants/storageKeys';

import KeyboardNormalizer from '../../../HOCs/KeyboardNormalizerFolding';
import Notification from '../../../components/Notification/Notification';
import Header from '../../../components/Header/Header';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import FormInput from '../../../components/FormInput/FormInput';
import Footer from '../../../components/Footer/Footer';
import Indent from '../../../components/Indent/Indent';

import welcomeBack from '../../../../assets/images/welcomeBack.png';
import {
  authPageWrapper as wrapper,
  formWrapper,
  header,
  view,
} from '../../../../styles/mixins';
import styles from './SignInUserEmail.styles';

function SignInUserEmail({ navigation, height }) {
  useFocusEffect(() => statusBar('dark'));

  const [formError, setFormError] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const signIn = async ({ email, password }) => {
    try {
      setShowLoader(true);
      await signInUser(email, password);
      setFormError('');

      if (await AsyncStorage.getItem(USE_BIOMETRIC) === 'true') {
        await navigation.navigate(USER);
      } else {
        const { available } = await ReactNativeBiometrics.isSensorAvailable();
        if (available) {
          await navigation.navigate(AUTHENTICATION, { screen: BIOMETRIC });
        } else {
          await navigation.push(PASSCODE, { nextPage: USER, isNew: true });
        }
      }
    } catch (e) {
      setFormError(e);
    }
    setShowLoader(false);
    Keyboard.dismiss();
  };

  return (
    <ScrollView>
      <Formik
        validationSchema={yup.object().shape({
          email: emailValidator,
          password: passwordValidator,
        })}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={signIn}
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
          <>
            <View style={view}>
              <View style={header}>
                <Header
                  topText="Welcome Back"
                  navigation={navigation}
                />
                <Animated.Image source={welcomeBack} style={[{ height }]} />
              </View>
              <View style={formWrapper}>
                <FormInput
                  keyboardType="email-address"
                  autoCompleteType="email"
                  set={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  textContentType="emailAddress"
                  placeholder="Email Address"
                  error={touched.email && errors.email}
                />
                <FormInput
                  autoCompleteType="password"
                  set={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  textContentType="password"
                  placeholder="Password"
                  error={touched.password && errors.password}
                />
                <View style={styles.underForm}>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate(AUTHENTICATION, {
                      screen: FORGOT_PASSWORD,
                      params: { email: errors.email ? '' : values.email },
                    })}
                  >
                    <Text allowFontScaling={false} style={styles.text}>Forgot password?</Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
            <SafeAreaView
              style={{
                ...view,
                marginBottom: Platform.OS === 'android' ? 20 : 0,
              }}
            >
              <DefaultButton
                title="Log In"
                onPress={handleSubmit}
                showLoader={showLoader}
                disabled={!(isValid && dirty)}
              />
              <Indent height={5} />
              <Footer navigation={navigation} accountIsAbsent />
            </SafeAreaView>
          </>
        )}
      </Formik>
      <Notification notification={formError} close={() => setFormError('')} />
    </ScrollView>
  );
}

SignInUserEmail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  height: PropTypes.object,
};

export default KeyboardNormalizer(SignInUserEmail, wrapper, 210);
