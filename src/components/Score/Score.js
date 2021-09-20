import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableOpacity,
} from 'react-native';

import { shadowBlock, view } from '../../../styles/mixins';
import colors from '../../../styles/colors';
import styles from './Score.styles';

export default function Score({ image, text, isSelected, onPress = () => {} }) {
  return (
    <TouchableOpacity style={view} onPress={onPress}>
      <View
        style={{
          ...shadowBlock,
          borderWidth: 2,
          justifyContent: 'space-between',
          borderColor: isSelected ? colors.purple : shadowBlock.borderColor,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {image && image}
          <Text allowFontScaling={false} style={styles.currency}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

Score.ModalWrapper = {
  image: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onPress: PropTypes.func,
};
