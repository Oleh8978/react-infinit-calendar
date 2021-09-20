import React from 'react';
import PropTypes from 'prop-types';
import {
  View, TouchableWithoutFeedback, Text,
} from 'react-native';

import { DEVICE_WIDTH } from '../../../constants/constants';
import Number from '../Number/Number';

import QuestionImage from '../../../assets/svgs/Question';
import { view, smallBlock } from '../../../styles/mixins';
import colors from '../../../styles/colors';
import styles from './SmallValueBlock.styles';

export default function SmallValueBlock({
  name,
  onPress,
  isActive,
  currency = 'USD',
  value = 0,
  showQuestion = false,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          ...smallBlock,
          borderColor: isActive ? colors.purpleLight : colors.white,
        }}
      >
        <View style={{ ...view, opacity: isActive ? 1 : 0.5 }}>
          {showQuestion ? (
            <View style={styles.question}>
              <QuestionImage />
            </View>
          ) : (
            <></>
          )}
          <Text allowFontScaling={false} style={{ ...styles.blockHeaderText, fontSize: DEVICE_WIDTH <= 360 ? 11 : 13 }}>{name}</Text>
          <Text allowFontScaling={false} style={styles.value}>
            <Text allowFontScaling={false} style={styles.valueCurrency}>{currency}</Text>
            {' '}
            {currency === 'USD' ? (
              <Number digit={value} type="usd" />
            ) : (
              <Number digit={value} type="crypto" />
            )}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

SmallValueBlock.ModalWrapper = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  currency: PropTypes.string,
  value: PropTypes.number,
  showQuestion: PropTypes.bool,
};
