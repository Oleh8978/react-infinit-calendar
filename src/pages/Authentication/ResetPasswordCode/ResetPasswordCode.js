import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View, Animated, SafeAreaView, ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { Formik } from 'formik';
import * as yup from 'yup';

import statusBar from '../../../../utilities/statusBar';
import {
  passwordValidator,
  verificationCode,
} from '../../../../utilities/yupValidators';

import { AUTHENTICATION } from '../../../../constants/navigation/navigators';
import {
  SIGN_IN_USER_EMAIL,
  WELL_DONE,
} from '../../../../constants/navigation/authenticationScreens';
import { DEVICE_WIDTH } from '../../../../constants/constants';

import KeyboardNormalizer from '../../../HOCs/KeyboardNormalizerFolding';
import Header from '../../../components/Header/Header';
import FormInput from '../../../components/FormInput/FormInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import Indent from '../../../components/Indent/Indent';
import Notification from '../../../components/Notification/Notification';
import PasswordValidator from '../../../components/PasswordValidator/PasswordValidator';

import newPasswordImage from '../../../../assets/images/newPassword.png';
import {
  authPageWrapper as wrapper,
  view,
  formWrapper,
  header,
} from '../../../../styles/mixins';

function ResetPasswordCode({ navigation, route, height }) {
  useFocusEffect(() => statusBar('dark'));

  const [formError, setFormError] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordValidators, setPasswordValidators] = useState(
    {
      length: true,
      number: true,
      upperCaseLetter: true,
      lowercaseLetter: true,
    },
  );
  const [repeatPassword, setRepeatPassword] = useState('');

  useEffect(() => {
    if (password.length) {
      setPasswordValidators({
        length: password.length >= 8,
        number: /\d/.test(password),
        upperCaseLetter: /[A-Z]/.test(password),
        lowercaseLetter: /[a-z]/.test(password),
      });
    } else {
      setPasswordValidators({
        length: true,
        number: true,
        upperCaseLetter: true,
        lowercaseLetter: true,
      });
    }
  }, [password]);

  const resetCode = async (_values) => {
    try {
      setShowLoader(true);
      await Auth.forgotPasswordSubmit(
        route.params.email,
        _values.code,
        _values.password,
      );
      setFormError('');
      navigation.navigate(AUTHENTICATION, {
        screen: WELL_DONE,
        params: {
          buttonText: 'Login',
          onPress: () => navigation.navigate(AUTHENTICATION, {
            screen: SIGN_IN_USER_EMAIL,
          }),
        },
      });
    } catch (e) {
      setFormError(e);
    }
    setShowLoader(false);
  };

  return (
    <>
      <View style={{ ...view, height: '100%' }}>
        <View style={header}>
          <Header
            topText="Create New Password"
            bottomText="We have sent you verification code to change your password."
            navigation={navigation}
          />
          <Indent height={28} />
          <Animated.Image source={newPasswordImage} style={[{ height }]} />
        </View>
        <Formik
          validationSchema={yup.object().shape({
            code: verificationCode,
            password: passwordValidator,
            repeatPassword: passwordValidator,
          })}
          initialValues={{
            code: '',
            password: '',
            repeatPassword: '',
          }}
          onSubmit={resetCode}
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
            <SafeAreaView
              style={{
                ...formWrapper,
                justifyContent: 'space-between',
                flex: 1,
                paddingHorizontal: 0,
              }}
            >
              <ScrollView
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
              >
                <View style={{ ...view, paddingHorizontal: '5%' }}>
                  <FormInput
                    set={handleChange('code')}
                    value={values.code}
                    placeholder="Verification code"
                    error={touched.code && errors.code}
                  />
                  <FormInput
                    autoCompleteType="password"
                    set={(value) => { handleChange('password')(value); setPassword(value); }}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    textContentType="password"
                    placeholder="New password"
                    error={touched.password && !!errors.password}
                  />
                  <FormInput
                    autoCompleteType="password"
                    set={(value) => { handleChange('repeatPassword')(value); setRepeatPassword(value); }}
                    onBlur={handleBlur('repeatPassword')}
                    value={values.repeatPassword}
                    textContentType="password"
                    placeholder="Repeat password"
                    error={touched.repeatPassword && (!repeatPassword || (password !== repeatPassword ? 'Passwords do not match' : '') || !!errors.repeatPassword)}
                  />
                  <Indent height={5} />
                  <PasswordValidator validators={passwordValidators} />
                  <Indent height={10} />
                </View>
              </ScrollView>
              <DefaultButton
                customStyles={{ marginTop: DEVICE_WIDTH <= 360 ? 30 : 0 }}
                title="Submit"
                onPress={handleSubmit}
                showLoader={showLoader}
                disabled={!(isValid && dirty)}
              />
            </SafeAreaView>
          )}
        </Formik>
      </View>
      <Notification notification={formError} close={() => setFormError('')} />
    </>
  );
}

ResetPasswordCode.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.object,
  height: PropTypes.object,
};

export default KeyboardNormalizer(ResetPasswordCode, wrapper, 200);
