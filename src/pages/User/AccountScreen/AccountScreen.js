import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  ACCOUNT,
  KNOW_YOUR_CUSTOMER,
  SETTINGS,
  CHANGE_PASSWORD,
  PASSCODE,
  WELL_DONE,
} from '../../../../constants/navigation/userScreens';

import Account from '../Account/Account';
import Settings from '../Settings/Settings';
import KnowYourCustomer from '../KnowYourCustomer/KnowYourCustomer';
import ChangePassword from '../ChangePassword/ChangePassword';
import WellDone from '../../WellDone/WellDone';
import Passcode from '../../Passcode/Passcode';

const Stack = createStackNavigator();

export default function AccountScreen() {
  return (
    <Stack.Navigator
      initialRouteName={ACCOUNT}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ACCOUNT} component={Account} />
      <Stack.Screen name={SETTINGS} component={Settings} />
      {/* TODO: fix gesture */}
      <Stack.Screen
        name={KNOW_YOUR_CUSTOMER}
        component={KnowYourCustomer}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name={CHANGE_PASSWORD} component={ChangePassword} />
      <Stack.Screen name={PASSCODE} component={Passcode} />
      <Stack.Screen name={WELL_DONE} component={WellDone} />
    </Stack.Navigator>
  );
}
