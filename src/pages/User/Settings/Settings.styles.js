import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';

import { DEVICE_WIDTH } from '../../../../constants/constants';

export default StyleSheet.create({
  topText: {
    fontSize: 12,
    color: colors.black,
  },
  bottomText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    color: colors.black,

  },
  automaticCollateralText: {
    paddingLeft: 25,
    width: DEVICE_WIDTH <= 360 ? 280 : 325,
    fontSize: 12,
    color: colors.grey,
  },
});
