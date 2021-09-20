import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '../Main/Main';
import SignType from '../SignType/SignType';
import CreateUserEmail from '../CreateUserEmail/CreateUserEmail';
import ConfirmEmailAddress from '../ConfirmEmailAddress/ConfirmEmailAddress';
import SignInUserEmail from '../SignInUserEmail/SignInUserEmail';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import ResetPasswordCode from '../ResetPasswordCode/ResetPasswordCode';
import Biometric from '../Biometric/Biometric';
import Passcode from '../../Passcode/Passcode';
import WellDone from '../../WellDone/WellDone';
import {
  MAIN,
  SIGN_TYPE,
  CREATE_USER_EMAIL,
  CONFIRM_EMAIL_ADDRESS,
  SIGN_IN_USER_EMAIL,
  FORGOT_PASSWORD,
  RESET_PASSWORD_CODE,
  BIOMETRIC,
  WELL_DONE,
  PASSCODE,
} from '../../../../constants/navigation/authenticationScreens';

const Stack = createStackNavigator();

export default function Authentication() {
  return (
    <Stack.Navigator
      initialRouteName={MAIN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={MAIN} component={Main} />
      <Stack.Screen name={SIGN_TYPE} component={SignType} />
      <Stack.Screen name={CREATE_USER_EMAIL} component={CreateUserEmail} />
      <Stack.Screen
        name={CONFIRM_EMAIL_ADDRESS}
        component={ConfirmEmailAddress}
      />
      <Stack.Screen name={SIGN_IN_USER_EMAIL} component={SignInUserEmail} />
      <Stack.Screen name={FORGOT_PASSWORD} component={ForgotPassword} />
      <Stack.Screen name={RESET_PASSWORD_CODE} component={ResetPasswordCode} />
      <Stack.Screen name={BIOMETRIC} component={Biometric} />
      <Stack.Screen name={WELL_DONE} component={WellDone} />
      <Stack.Screen name={PASSCODE} component={Passcode} />
    </Stack.Navigator>
  );
}
