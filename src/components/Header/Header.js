import React from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView, View, Text, TouchableOpacity,
} from 'react-native';

import ChevronLeftBlueImage from '../../../assets/svgs/ChevronLeftBlue';
import ChevronLeftWhiteImage from '../../../assets/svgs/ChevronLeftWhite';

import colors from '../../../styles/colors';
import styles from './Header.styles';

export default function Header({
  navigation,
  topText,
  bottomText,
  goBack = true,
  goBackFunction = () => navigation.goBack(),
  isLight = true,
  deviceMarginTop,
}) {
  const topTextColor = isLight ? colors.white : colors.black;
  const bottomTextColor = isLight ? colors.white : colors.grey;

  return (
    <SafeAreaView style={{ ...styles.wrapper, marginTop: deviceMarginTop }}>
      <View style={styles.header}>
        {goBack && (
          <TouchableOpacity style={styles.backArrow} onPress={goBackFunction}>
            {isLight ? <ChevronLeftWhiteImage /> : <ChevronLeftBlueImage />}
          </TouchableOpacity>
        )}
        <Text allowFontScaling={false} style={{ ...styles.topText, color: topTextColor }}>{topText}</Text>
      </View>
      <Text allowFontScaling={false} style={{ ...styles.bottomText, color: bottomTextColor }}>
        {bottomText}
      </Text>
    </SafeAreaView>
  );
}

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  topText: PropTypes.string,
  bottomText: PropTypes.string,
  goBack: PropTypes.bool,
  goBackFunction: PropTypes.func,
  isLight: PropTypes.bool,
  deviceMarginTop: PropTypes.number,
};
