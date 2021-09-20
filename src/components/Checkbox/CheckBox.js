import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import styles from './Checkbox.styles';

import colors from '../../../styles/colors';

export default function CheckBox({ checked }) {
  return (
    <View
      style={{
        ...styles.checkBox,
        backgroundColor: checked ? colors.purple : colors.greyLight,
      }}
    />
  );
}

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
};
