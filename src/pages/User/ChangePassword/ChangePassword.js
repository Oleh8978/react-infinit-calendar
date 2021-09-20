import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView, Animated, View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import * as yup from 'yup';
import { Formik } from 'formik';

import statusBar from '../../../../utilities/statusBar';
import { passwordValidator } from '../../../../utilities/yupValidators';

import {
  SETTINGS,
  WELL_DONE,
} from '../../../../constants/navigation/userScreens';
import { DEVICE_WIDTH } from '../../../../constants/constants';

import KeyboardNormalizer from '../../../HOCs/KeyboardNormalizerFolding';
import Header from '../../../components/Header/Header';
import FormInput from '../../../components/FormInput/FormInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import Indent from '../../../components/Indent/Indent';
import Notification from '../../../components/Notification/Notification';

import newPasswordImage from '../../../../assets/images/newPassword.png';
import {
  authPageWrapper as wrapper,
  formWrapperSE,
  header,
  view,
} from '../../../../styles/mixins';

function ChangePassword({ navigation, height }) {
  useFocusEffect(() => statusBar('dark'));

  const [formError, setFormError] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const onChangePassword = async (values, { resetForm }) => {
    try {
      setShowLoader(true);
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(
        user,
        values.oldPassword,
        values.newPassword,
      );
      setFormError('');
      navigation.navigate(WELL_DONE, {
        buttonText: 'Back to Settings',
        onPress: () => navigation.navigate(SETTINGS),
      });
      resetForm();
    } catch (e) {
      setFormError(e);
    }
    setShowLoader(false);
  };

  return (
    <>
      <View style={view}>
        <View style={header}>
          <Header
            topText="Change password"
            bottomText="Your new password must be different from a previously used password."
            navigation={navigation}
          />
          <Indent height={25} />
          <Animated.Image source={newPasswordImage} style={[{ height }]} />
        </View>
        <Formik
          validationSchema={yup.object().shape({
            oldPassword: passwordValidator,
            newPassword: passwordValidator,
            repeatPassword: passwordValidator.oneOf(
              [yup.ref('newPassword')],
              'Passwords do not match',
            ),
          })}
          initialValues={{
            oldPassword: '',
            newPassword: '',
            repeatPassword: '',
          }}
          onSubmit={onChangePassword}
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
            <ScrollView
              style={formWrapperSE}
              showsVerticalScrollIndicator={false}
            >
              <View style={view}>
                <FormInput
                  autoCompleteType="password"
                  set={handleChange('oldPassword')}
                  onBlur={handleBlur('oldPassword')}
                  value={values.oldPassword}
                  textContentType="password"
                  placeholder="Old password"
                  error={touched.oldPassword && errors.oldPassword}
                />
                <FormInput
                  autoCompleteType="password"
                  set={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  value={values.newPassword}
                  textContentType="newPassword"
                  placeholder="New password"
                  error={touched.newPassword && errors.newPassword}
                />
                <FormInput
                  autoCompleteType="password"
                  set={handleChange('repeatPassword')}
                  onBlur={handleBlur('repeatPassword')}
                  value={values.repeatPassword}
                  textContentType="password"
                  placeholder="Repeat password"
                  error={touched.repeatPassword && errors.repeatPassword}
                />
                <Indent height={35} />
                <DefaultButton
                  customStyles={DEVICE_WIDTH <= 360 ? { marginBottom: 50 } : null}
                  title="Change"
                  onPress={handleSubmit}
                  showLoader={showLoader}
                  disabled={!(isValid && dirty)}
                />
              </View>
            </ScrollView>
          )}
        </Formik>
      </View>
      <Notification notification={formError} />
    </>
  );
}

ChangePassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  height: PropTypes.object,
};

export default KeyboardNormalizer(ChangePassword, wrapper, 200);
