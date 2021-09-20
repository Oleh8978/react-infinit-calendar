import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  DEPOSIT,
  TRANSFER_BETWEEN_WALLETS,
  WALLET_INFORMATION,
  WALLETS,
  WITHDRAW,
} from '../../../../constants/navigation/userScreens';

import Wallets from '../Wallets/Wallets';
import WalletInformation from '../WalletInformation/WalletInformation';
import TransferBetweenWallets from '../TransferBetweenWallets/TransferBetweenWallets';
import Withdraw from '../Withdraw/Withdraw';
import Deposit from '../Deposit/Deposit';

const Stack = createStackNavigator();

export default function WalletsScreen() {
  return (
    <Stack.Navigator
      initialRouteName={WALLETS}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={WALLETS} component={Wallets} />
      <Stack.Screen name={WALLET_INFORMATION} component={WalletInformation} />
      <Stack.Screen name={DEPOSIT} component={Deposit} />
      <Stack.Screen
        name={TRANSFER_BETWEEN_WALLETS}
        component={TransferBetweenWallets}
      />
      <Stack.Screen name={WITHDRAW} component={Withdraw} />
    </Stack.Navigator>
  );
}
