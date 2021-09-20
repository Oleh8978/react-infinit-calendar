import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Dimensions, View, Animated,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { Formik } from 'formik';
import * as yup from 'yup';

import statusBar from '../../../../utilities/statusBar';
import { emailValidator } from '../../../../utilities/yupValidators';

import { AUTHENTICATION } from '../../../../constants/navigation/navigators';
import { RESET_PASSWORD_CODE } from '../../../../constants/navigation/authenticationScreens';

import KeyboardNormalizer from '../../../HOCs/KeyboardNormalizerFolding';
import Header from '../../../components/Header/Header';
import FormInput from '../../../components/FormInput/FormInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import Indent from '../../../components/Indent/Indent';
import Notification from '../../../components/Notification/Notification';

import forgotPassword from '../../../../assets/images/forgotPassword.png';
import OpacityEMlogoImage from '../../../../assets/svgs/OpacityEMlogo';

import {
  view,
  authPageWrapper as wrapper,
  formWrapper,
  header,
} from '../../../../styles/mixins';

function ForgotPassword({ navigation, height, route }) {
  useFocusEffect(() => statusBar('dark'));

  const [formError, setFormError] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  return (
    <>
      <View style={view}>
        <View style={header}>
          <Header
            topText="Forgot password?"
            bottomText="Please enter your email address to request a password reset."
            navigation={navigation}
          />
          <Indent height={18} />
          <Animated.Image
            source={forgotPassword}
            style={[{ height, zIndex: 1 }]}
          />
          <OpacityEMlogoImage
            style={{ position: 'absolute', bottom: -310, left: 0 }}
          />
        </View>
        <Formik
          validationSchema={yup.object().shape({ email: emailValidator })}
          initialValues={{ email: route.params?.email }}
          onSubmit={async (user) => {
            try {
              setShowLoader(true);
              const email = user.email;

              await Auth.forgotPassword(email);
              setFormError('');
              navigation.navigate(AUTHENTICATION, {
                screen: RESET_PASSWORD_CODE,
                params: { email },
              });
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
              <DefaultButton
                title="Reset Password"
                onPress={handleSubmit}
                customStyles={{ marginTop: 40 }}
                showLoader={showLoader}
                disabled={!(isValid && (dirty || route.params?.email?.length))}
              />
            </View>
          )}
        </Formik>
      </View>
      <Notification notification={formError} close={() => setFormError('')} />
    </>
  );
}

ForgotPassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  height: PropTypes.object,
  route: PropTypes.object,
};

export default KeyboardNormalizer(
  ForgotPassword,
  wrapper,
  201,
  Dimensions.get('window').height > 700 ? 201 : 0,
);
