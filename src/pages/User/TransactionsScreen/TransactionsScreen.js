import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  TRANSACTION_DETAILS,
  TRANSACTIONS,
} from '../../../../constants/navigation/userScreens';

import Transactions from '../Transactions/Transactions';
import TransactionDetails from '../TransactionDetails/TransactionDetails';

const Stack = createStackNavigator();

export default function TransactionsScreen() {
  return (
    <Stack.Navigator
      initialRouteName={TRANSACTIONS}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={TRANSACTIONS} component={Transactions} />
      <Stack.Screen name={TRANSACTION_DETAILS} component={TransactionDetails} />
    </Stack.Navigator>
  );
}
