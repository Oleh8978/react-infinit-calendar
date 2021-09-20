import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';

import { DEVICE_WIDTH } from '../../../../constants/constants';

export default StyleSheet.create({
  accountLeftBackground: {
    left: 0,
    position: 'absolute',
  },
  accountRightBackground: {
    right: 0,
    position: 'absolute',
  },
  name: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    fontSize: DEVICE_WIDTH <= 360 ? 21 : 26,
    color: colors.white,
  },
  email: {
    textAlign: 'center',
    color: colors.greyLight,
  },
  contactSupportText: {
    position: 'absolute',
    top: DEVICE_WIDTH <= 360 ? 30 : 35,
    right: 25,
    fontSize: DEVICE_WIDTH <= 360 ? 15 : 18,
    color: colors.white,
  },
});
