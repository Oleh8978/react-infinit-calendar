import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  WITHDRAW_CREDIT,
  DASHBOARD,
  DEPOSIT,
  REPAY_CREDIT,
} from '../../../../constants/navigation/userScreens';

import Dashboard from '../Dashboard/Dashboard';
import Deposit from '../Deposit/Deposit';
import WithdrawCredit from '../WithdrawCredit/WithdrawCredit';
import PlaidTransfer from '../RepayCredit/RepayCredit';

const Stack = createStackNavigator();

export default function DashboardScreen() {
  return (
    <Stack.Navigator
      initialRouteName={DASHBOARD}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={DASHBOARD} component={Dashboard} />
      <Stack.Screen name={REPAY_CREDIT} component={PlaidTransfer} />
      <Stack.Screen name={DEPOSIT} component={Deposit} />
      <Stack.Screen name={WITHDRAW_CREDIT} component={WithdrawCredit} />
    </Stack.Navigator>
  );
}
