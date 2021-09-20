import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, ScrollView, SafeAreaView, TouchableOpacity,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { useFocusEffect } from '@react-navigation/native';

import statusBar from '../../../../utilities/statusBar';
import { getDate, getTime } from '../../../../utilities/formatters/timeFormatter';
import transactionColor from '../../../../utilities/transactionColor';

import Header from '../../../components/Header/Header';
import EMLogoHeader from '../../../components/EMLogoHeader/EMLogoHeader';
import TransactionImage from '../../../components/TransactionImage/TransactionImage';
import Indent from '../../../components/Indent/Indent';
import Notification from '../../../components/Notification/Notification';

import {
  authPageWrapper as wrapper,
  smallHeader,
  view,
} from '../../../../styles/mixins';
import styles from './TransactionDetails.styles';

export default function TransactionDetails({ navigation, route: { params: { transaction } } }) {
  useFocusEffect(() => statusBar('dark'));

  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });
    return () => parent.setOptions({
      tabBarVisible: true,
    });
  }, []);

  const [notification, setNotification] = useState('');

  const onCopy = (name, value) => {
    setNotification(`${name} copied to clipboard`);
    Clipboard.setString(value);
  };

  return (
    <>
      <View
        style={{
          ...smallHeader,
          zIndex: 1,
          alignItems: 'center',
        }}
      >
        <EMLogoHeader />
        <Header navigation={navigation} topText="Transaction Details" />
        <View style={styles.transactionLogoBack}>
          <View
            style={{
              ...styles.transactionLogoColor,
              backgroundColor: transactionColor(transaction.type),
            }}
          >
            <TransactionImage type={transaction.type} isWhite />
          </View>
        </View>
      </View>
      <View style={wrapper}>
        <ScrollView
          style={{ maxWidth: '100%' }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.body}>
            <View style={view}>
              <Text
                allowFontScaling={false}
                style={{
                  ...styles.transactionTypeText,
                  color: transactionColor,
                }}
              >
                {transaction.name}
              </Text>
              <View style={{ flexDirection: 'row', ...styles.block }}>
                <View style={{ width: '60%' }}>
                  <Text allowFontScaling={false} style={styles.topText}>Date</Text>
                  <Text allowFontScaling={false} style={styles.bottomText}>
                    {getDate(transaction.created)}
                  </Text>
                </View>
                <View>
                  <Text allowFontScaling={false} style={styles.topText}>Time</Text>
                  <Text allowFontScaling={false} style={styles.bottomText}>
                    {getTime(transaction.created)}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', ...styles.block }}>
                <View style={{ width: '60%' }}>
                  <Text allowFontScaling={false} style={styles.topText}>Total amount</Text>
                  <Text allowFontScaling={false} style={styles.bottomText}>
                    {`${transaction.coin || 'USD'} ${transaction.amount}`}
                  </Text>
                </View>
                <View>
                  <Text allowFontScaling={false} style={styles.topText}>Fee</Text>
                  <Text allowFontScaling={false} style={styles.bottomText}>0</Text>
                </View>
              </View>
            </View>
            <View style={{ ...styles.block, borderBottomWidth: 0, marginTop: 0 }}>
              <TouchableOpacity onPress={() => onCopy('Transaction ID', transaction.id)}>
                <Text allowFontScaling={false} style={styles.topText}>Transaction ID</Text>
                <Text allowFontScaling={false} style={styles.bottomText}>{transaction.id}</Text>
              </TouchableOpacity>
              <Indent height={5} />
              <TouchableOpacity onPress={() => onCopy('Acceptor', transaction.acceptor)}>
                <Text allowFontScaling={false} style={styles.topText}>Acceptor</Text>
                <Text allowFontScaling={false} style={styles.bottomText}>{transaction.acceptor}</Text>
              </TouchableOpacity>
              <Indent height={5} />
              <View>
                <Text allowFontScaling={false} style={styles.topText}>Status</Text>
                <Text allowFontScaling={false} style={styles.bottomText}>{transaction.status}</Text>
              </View>
              <Indent height={5} />
              <TouchableOpacity onPress={() => onCopy('Hash', transaction.hash)}>
                <Text allowFontScaling={false} style={styles.topText}>Hash</Text>
                <Text allowFontScaling={false} style={styles.bottomText}>{transaction.hash}</Text>
              </TouchableOpacity>
              <Indent height={5} />
              <TouchableOpacity onPress={() => onCopy('Initiator', transaction.initiator)}>
                <Text allowFontScaling={false} style={styles.topText}>Initiator</Text>
                <Text allowFontScaling={false} style={styles.bottomText}>{transaction.initiator}</Text>
              </TouchableOpacity>
              <Indent height={5} />
              <Text allowFontScaling={false} style={styles.topText}>Direction</Text>
              <Text allowFontScaling={false} style={styles.bottomText}>{transaction.direction}</Text>
              <View style={{ minWidth: '100%' }} />
            </View>
            <Indent height={35} />
            <SafeAreaView />
          </View>
        </ScrollView>
      </View>
      <Notification type="notification" notification={notification} close={() => setNotification('')} />
    </>
  );
}

TransactionDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.object,
  }),
};
