import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Animated, ScrollView, View,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useFocusEffect } from '@react-navigation/native';

import statusBar from '../../../../utilities/statusBar';
import createUser from '../../../../services/cognito/createUserThroughEmail';

import KeyboardNormalizer from '../../../HOCs/KeyboardNormalizerFolding';
import Header from '../../../components/Header/Header';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import Footer from '../../../components/Footer/Footer';
import FormInput from '../../../components/FormInput/FormInput';
import Notification from '../../../components/Notification/Notification';
import Indent from '../../../components/Indent/Indent';
import PasswordValidator from '../../../components/PasswordValidator/PasswordValidator';

import { AUTHENTICATION } from '../../../../constants/navigation/navigators';
import { CONFIRM_EMAIL_ADDRESS } from '../../../../constants/navigation/authenticationScreens';

import createYourAccount from '../../../../assets/images/createYourAccount.png';
import {
  authPageWrapper as wrapper,
  header,
  view,
} from '../../../../styles/mixins';
import styles from './CreateUserEmail.styles';
import {
  emailValidator,
  familyNameValidator,
  nameValidator,
  passwordValidator,
} from '../../../../utilities/yupValidators';

function CreateUserEmail({ navigation, height, addHeight }) {
  useFocusEffect(() => statusBar('dark'));

  const [password, setPassword] = useState('');
  const [passwordValidators, setPasswordValidators] = useState(
    {
      length: true,
      number: true,
      upperCaseLetter: true,
      lowercaseLetter: true,
    },
  );
  const [formError, setFormError] = useState('');
  const [showLoader, setShowLoader] = useState(false);

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

  return (
    <View style={{ ...wrapper }}>
      <View style={header}>
        <Header topText="Create Account" navigation={navigation} />
        <Animated.Image source={createYourAccount} style={[{ height }]} />
      </View>
      <Formik
        validationSchema={yup.object().shape({
          name: nameValidator,
          familyName: familyNameValidator,
          email: emailValidator,
          password: passwordValidator,
        })}
        initialValues={{
          name: '',
          familyName: '',
          email: '',
          password: '',
        }}
        onSubmit={async (newUser, { resetForm }) => {
          try {
            setShowLoader(true);
            const { user } = await createUser(newUser);

            if (user) {
              setFormError('');
              navigation.navigate(AUTHENTICATION, {
                screen: CONFIRM_EMAIL_ADDRESS,
                params: { username: newUser.email },
              });
              resetForm();
            }
          } catch (e) {
            setFormError(e);
          }
          setShowLoader(false);
        }}
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
          <View style={styles.formWrapper}>
            <View style={styles.form}>
              <ScrollView
                style={styles.scrollableFormBody}
                showsVerticalScrollIndicator={false}
              >
                <FormInput
                  autoCompleteType="name"
                  autoCapitalize="words"
                  set={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  textContentType="givenName"
                  placeholder="First name"
                  error={touched.name && errors.name}
                />
                <FormInput
                  autoCompleteType="name"
                  autoCapitalize="words"
                  set={handleChange('familyName')}
                  onBlur={handleBlur('familyName')}
                  value={values.familyName}
                  textContentType="familyName"
                  placeholder="Last name"
                  error={touched.familyName && errors.familyName}
                />
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
                  set={(value) => {
                    handleChange('password')(value);
                    setPassword(value);
                  }}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  textContentType="newPassword"
                  placeholder="Password"
                  error={touched.password && !!errors.password}
                />
                <Indent height={5} />
                <PasswordValidator validators={passwordValidators} />
                <Indent height={10} />
              </ScrollView>
            </View>
            <View style={view}>
              <DefaultButton
                title="Create Account"
                onPress={handleSubmit}
                showLoader={showLoader}
                disabled={!(isValid && dirty)}
              />
              <Animated.View style={[{ ...view, maxHeight: height }]}>
                <Footer navigation={navigation} customContactBorderWidth={addHeight} />
              </Animated.View>
            </View>
          </View>
        )}
      </Formik>
      <Notification notification={formError} close={() => setFormError('')} />
    </View>
  );
}
CreateUserEmail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  height: PropTypes.object,
};

export default KeyboardNormalizer(CreateUserEmail, wrapper, 171, 0, 1);
