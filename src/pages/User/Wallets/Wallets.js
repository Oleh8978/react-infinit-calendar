import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import statusBar from '../../../../utilities/statusBar';
import Store from '../../../store';

import { ACCOUNT } from '../../../../constants/navigation/userScreens';

import EMLogoHeader from '../../../components/EMLogoHeader/EMLogoHeader';
import SmallValueBlock from '../../../components/SmallValueBlock/SmallValueBlock';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import Wallet from '../../../components/Wallet/Wallet';
import Notification from '../../../components/Notification/Notification';

import ENDZlogoImage from '../../../../assets/svgs/EMLogo';

import {
  accPageWrapper as wrapper,
  header,
  view,
  flexRow,
  accountPageBody,
} from '../../../../styles/mixins';
import styles from './Wallets.styles';

export default observer(({ navigation }) => {
  useFocusEffect(() => statusBar('dark'));

  const [tab, setTab] = useState('Saving Balance');
  const [wallets, setWallets] = useState(Store.wallets.wallets);
  const [error, setError] = useState('');

  useEffect(() => {
    setWallets(Store.wallets.wallets.filter((_wallet) => _wallet.coin !== 'USD'));
  }, [Store.wallets.wallets]);

  const createWalletRedirect = async () => {
    if (Store.user.KYCProgress < 3) {
      Alert.alert(
        'To create your Wallet',
        'Please complete the KYC identity verification process first.',
        [
          {
            text: 'Later',
            style: 'cancel',
          },
          {
            text: "Let's do it!",
            onPress: async () => navigation.navigate(ACCOUNT, { screen: ACCOUNT, params: { showPicker: true } }),
          },
        ],
        { cancelable: false },
      );
    } else {
      Alert.alert('The data you provided is awaiting verification.');
    }
  };

  return (
    <>
      <View style={{
        ...header,
        height: '30%',
      }}
      >
        <EMLogoHeader />
        <ENDZlogoImage height={45} width={45} />
        <Text allowFontScaling={false} style={styles.myWalletsText}>My Portfolio</Text>
      </View>
      <View style={wrapper}>
        <View style={accountPageBody}>
          <View style={flexRow}>
            <SmallValueBlock
              name="Saving Balance"
              onPress={() => setTab('Saving Balance')}
              isActive={tab === 'Saving Balance'}
              value={Store.wallets.totalSaving}
            />
            <SmallValueBlock
              name="Credit Line Balance"
              onPress={() => setTab('Credit Line Balance')}
              isActive={tab === 'Credit Line Balance'}
              value={Store.wallets.totalCredit}
            />
          </View>
          <View style={view}>
            {wallets.map((wallet) => (
              <Wallet
                balance={tab}
                coin={wallet?.coin}
                navigation={navigation}
                key={wallet?.coin}
              />
            ))}
            {!Store.wallets.wallets.length && (
            <DefaultButton
              title="Create Wallet"
              onPress={createWalletRedirect}
            />
            )}
          </View>
        </View>
      </View>
      <Notification notification={error} close={() => setError('')} />
    </>
  );
});

observer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
