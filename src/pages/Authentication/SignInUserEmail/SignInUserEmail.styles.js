import { StyleSheet } from 'react-native';

import { DEVICE_WIDTH } from '../../../../constants/constants';
import { flexRow } from '../../../../styles/mixins';
import colors from '../../../../styles/colors';

export default StyleSheet.create({
  underForm: {
    ...flexRow,
    justifyContent: 'flex-end',
    marginTop: DEVICE_WIDTH <= 360 ? 10 : 30,
  },
  text: {
    fontFamily: 'OpenSans-SemiBold',
    color: colors.black,
  },
});
