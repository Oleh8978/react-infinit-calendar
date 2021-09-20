import React from 'react';
import PropTypes from 'prop-types';

import {
  Text, TouchableOpacity, View,
} from 'react-native';

import Loader from '../Loader/Loader';

import colors from '../../../styles/colors';
import styles from './DefaultButton.styles';

import { DEVICE_WIDTH } from '../../../constants/constants';

export default function DefaultButton({
  title,
  onPress,
  isLight = false,
  disabled,
  customStyles,
  textStyles,
  showLoader = false,
  isSmall = false,
}) {
  const press = async () => {
    if (onPress && !showLoader) {
      await onPress();
    }
  };
  const buttonColor = disabled
    ? colors.grey
    : isLight
      ? colors.white
      : colors.purple;
  const textColor = disabled || !isLight ? colors.white : colors.purple;
  const borderColor = disabled ? colors.grey : colors.purple;

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        width:
          DEVICE_WIDTH <= 360 ? (isSmall ? 125 : 290) : isSmall ? 160 : 340,
        borderColor,
        backgroundColor: buttonColor,
        ...customStyles,
      }}
      onPress={press}
      disabled={disabled}
    >
      <Text
        allowFontScaling={false}
        style={{
          color: textColor,
          fontSize:
            DEVICE_WIDTH <= 375 ? (isSmall ? 12 : 16) : isSmall ? 16 : 18,
          ...textStyles,
        }}
      >
        {title}
      </Text>
      {showLoader && (
        <View style={styles.loader}>
          <Loader />
        </View>
      )}
    </TouchableOpacity>
  );
}
DefaultButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isLight: PropTypes.bool,
  disabled: PropTypes.bool,
  customStyles: PropTypes.object,
  textStyles: PropTypes.object,
  showLoader: PropTypes.bool,
  isSmall: PropTypes.bool,
};
