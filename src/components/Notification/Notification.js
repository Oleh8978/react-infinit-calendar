import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Store from '../../store';

import AttentionImage from '../../../assets/svgs/Attention';
import CloseImage from '../../../assets/svgs/CloseWhite';
import styles from './Notification.styles';
import colors from '../../../styles/colors';

export default function Notification({ notification, close, type = 'error' }) {
  const text = (notification?.message || notification || '').toString();

  return text.length ? (
    <View
      style={{
        ...styles.notification,
        backgroundColor:
          type === 'notification' ? colors.green : colors.redLight,
      }}
    >
      {type === 'error' && <View style={styles.attention}><AttentionImage /></View>}
      <ScrollView>
        <Text allowFontScaling={false} style={styles.text}>
          {text}
        </Text>
      </ScrollView>
      <SafeAreaView style={styles.close}>
        <TouchableOpacity
          onPress={close || (() => Store.application[type === 'notification' ? 'deleteNotification' : 'deleteError'](notification.id))}
        >
          <CloseImage />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  ) : (
    <></>
  );
}

Notification.ModalWrapper = {
  notification: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
