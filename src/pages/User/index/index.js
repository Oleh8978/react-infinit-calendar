import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { observer } from 'mobx-react-lite';

import Store from '../../../store';

import { AUTHENTICATION } from '../../../../constants/navigation/navigators';
import {
  DASHBOARD,
  WALLETS,
  TRANSACTIONS,
  ACCOUNT,
} from '../../../../constants/navigation/userScreens';

import AccountScreen from '../AccountScreen/AccountScreen';
import TransactionsScreen from '../TransactionsScreen/TransactionsScreen';
import WalletsScreen from '../WalletsScreen/WalletsScreen';
import Loader from '../../../components/Loader/Loader';

import DashboardImage from '../../../../assets/svgs/Dashboard';
import DashboardActiveImage from '../../../../assets/svgs/DashboardActive';
import WalletsImage from '../../../../assets/svgs/Wallets';
import WalletsActiveImage from '../../../../assets/svgs/WalletsActive';
import TransactionsImage from '../../../../assets/svgs/Transactions';
import TransactionsActiveImage from '../../../../assets/svgs/TransactionsActive';
import AccountImage from '../../../../assets/svgs/Account';
import AccountActiveImage from '../../../../assets/svgs/AccountActive';

import tabStyles from './index.styles';
import DashboardScreen from '../DashboardScreen/DashboardScreen';
import colors from '../../../../styles/colors';

const Tab = createBottomTabNavigator();

export default observer(({ navigation }) => {
  const [showLoader, setShowLoader] = useState(true);
  const [gotRates, setGotRates] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // Store.user signIn must be the first!
        await Store.user.signIn()
          .then(async () => {
            if (Store.user.tier < 1) {
              return navigation.navigate(AUTHENTICATION);
            }
          });
      } catch (e) {
        await Store.application.addError(e);
        navigation.navigate(AUTHENTICATION);
      }
      setShowLoader(false);
    })();
  }, []);

  useEffect(() => {
    setGotRates(!!Object.keys(Store.wallets.exchangeRates).length);
  }, [Store.wallets.exchangeRates]);

  if (showLoader && !gotRates) {
    return (
      <View style={{
        width: '100%',
        height: '100%',
        backgroundColor: colors.white,
      }}
      >
        <Loader color={colors.purple} isAbsolute size="large" />
      </View>
    );
  }

  return (
    <Tab.Navigator tabBarOptions={{ style: { position: 'absolute' }, showLabel: false }}>
      <Tab.Screen
        name={DASHBOARD}
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (focused ? (
            <View style={tabStyles.activeTab}>
              <DashboardActiveImage />
            </View>
          ) : (
            <View style={tabStyles.tab}>
              <DashboardImage />
            </View>
          )),
        }}
      />
      <Tab.Screen
        name={WALLETS}
        component={WalletsScreen}
        options={{
          tabBarIcon: ({ focused }) => (focused ? (
            <View style={tabStyles.activeTab}>
              <WalletsActiveImage />
            </View>
          ) : (
            <View style={tabStyles.tab}>
              <WalletsImage />
            </View>
          )),
        }}
      />
      <Tab.Screen
        name={TRANSACTIONS}
        component={TransactionsScreen}
        options={{
          tabBarIcon: ({ focused }) => (focused ? (
            <View style={tabStyles.activeTab}>
              <TransactionsActiveImage />
            </View>
          ) : (
            <View style={tabStyles.tab}>
              <TransactionsImage />
            </View>
          )),
        }}
      />
      <Tab.Screen
        name={ACCOUNT}
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused }) => (focused ? (
            <View style={tabStyles.activeTab}>
              <AccountActiveImage />
            </View>
          ) : (
            <View style={tabStyles.tab}>
              <AccountImage />
            </View>
          )),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: ACCOUNT }],
              })}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
});

observer.propTypes = {
  Component: PropTypes.element,
};
