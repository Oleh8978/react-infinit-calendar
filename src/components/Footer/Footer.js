import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Linking,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';

import { EMAIL, DEVICE_WIDTH } from '../../../constants/constants';
import { AUTHENTICATION } from '../../../constants/navigation/navigators';
import { SIGN_TYPE } from '../../../constants/navigation/authenticationScreens';

import { view } from '../../../styles/mixins';
import colors from '../../../styles/colors';
import styles from './Footer.styles';

export default function Footer({
  navigation,
  isLight = false,
  isContactSupport = true,
  accountIsAbsent = false,
  customContactBorderWidth = 1,
}) {
  const mainColor = isLight ? colors.white : colors.greyTransparent;
  const secondaryColor = isLight ? colors.white : colors.purple;
  const marginBottom = DEVICE_WIDTH <= 360 ? 8 : 15;

  return (
    <SafeAreaView style={{ ...view, marginBottom }}>
      {accountIsAbsent ? (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate(AUTHENTICATION, { screen: SIGN_TYPE, params: { type: 'registration' } })}
        >
          <Text allowFontScaling={false} style={{ color: mainColor }}>
            Don’t have an account?
            <Text
              allowFontScaling={false}
              style={{
                color: secondaryColor,
                fontFamily: 'OpenSans-SemiBold',
              }}
            >
              {' Sign Up'}
            </Text>
          </Text>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback onPress={() => navigation.navigate(AUTHENTICATION, { screen: SIGN_TYPE, params: { type: 'login' } })}>
          <Text allowFontScaling={false} style={{ color: mainColor }}>
            Already has an account?
            <Text
              allowFontScaling={false}
              style={{
                color: secondaryColor,
                fontFamily: 'OpenSans-SemiBold',
              }}
            >
              {' Login'}
            </Text>
          </Text>
        </TouchableWithoutFeedback>
      )}
      {isContactSupport && (
      <Animated.View style={{ ...styles.contactSupport, borderWidth: customContactBorderWidth, borderColor: secondaryColor }}>
        <TouchableOpacity
          onPress={() => Linking.openURL(`mailto:${EMAIL}`)}
        >
          <Text allowFontScaling={false} style={{ color: secondaryColor }}>Contact Support</Text>
        </TouchableOpacity>
      </Animated.View>
      )}
    </SafeAreaView>
  );
}

Footer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  isLight: PropTypes.bool,
  isContactSupport: PropTypes.bool,
  accountIsAbsent: PropTypes.bool,
};
