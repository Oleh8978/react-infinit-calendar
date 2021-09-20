import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, SafeAreaView,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import statusBar from '../../../../utilities/statusBar';

import depositCrypto from '../../../../services/depositCrypto';

import Store from '../../../store';

import Header from '../../../components/Header/Header';
import EMLogoHeader from '../../../components/EMLogoHeader/EMLogoHeader';
import Wallet from '../../../components/Wallet/Wallet';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import Notification from '../../../components/Notification/Notification';

import CopyImage from '../../../../assets/svgs/Copy';

import {
  smallHeader,
  accountPageBody,
  accPageWrapper as wrapper,
  greyInput,
  view,
} from '../../../../styles/mixins';
import colors from '../../../../styles/colors';
import styles from './Deposit.styles';

export default observer(
  ({
    navigation,
    route: {
      params: { coin, isParentTabBar = true },
    },
  }) => {
    useFocusEffect(() => statusBar('dark'));

    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [notification, setNotification] = useState('');
    const [showLoader, setShowLoader] = useState(false);

    const onDeposit = async () => {
      try {
        setShowLoader(true);
        setNotification('Address copied to clipboard');
        await depositCrypto(coin);
        await Store.wallets.updateAllData();
      } catch (e) {
        setError(e);
      }
      setShowLoader(false);
    };

    useEffect(() => {
      setAddress(Store.wallets.wallets.find((wallet) => wallet?.coin === coin)?.address);

      const parent = navigation.dangerouslyGetParent();
      parent.setOptions({
        tabBarVisible: false,
      });
      return () => parent.setOptions({
        tabBarVisible: isParentTabBar,
      });
    }, []);

    return (
      <>
        <View style={{ height: '100%', backgroundColor: colors.white }}>
          <View style={smallHeader}>
            <EMLogoHeader />
            <Header navigation={navigation} topText="Deposit Funds" />
          </View>
          <View style={{ ...accountPageBody, paddingHorizontal: '5%' }}>
            <Wallet coin={coin} isFull navigation={navigation} />
          </View>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ ...wrapper, justifyContent: 'space-between' }}>
              <View style={{ width: '100%' }}>
                <Text allowFontScaling={false} style={styles.textLeft}>Wallet</Text>
                <View style={greyInput}>
                  <Text allowFontScaling={false} style={{ color: colors.purple, fontSize: 13 }}>
                    {address}
                  </Text>
                </View>
              </View>
              <View style={view}>
                <DefaultButton
                  title="Copy Wallet Address"
                  onPress={async () => {
                        Clipboard.setString(address);
                        await onDeposit();
                      }}
                  showLoader={showLoader}
                />
                <CopyImage style={styles.copy} />
                <DefaultButton
                  title="Cancel"
                  onPress={navigation.goBack}
                  isLight
                />
              </View>
            </View>
          </SafeAreaView>
        </View>
        <Notification notification={error} close={() => setError('')} />
        <Notification type="notification" notification={notification} close={() => setNotification('')} />
      </>
    );
  },
);

observer.propTypes = {
  Component: PropTypes.element,
};
