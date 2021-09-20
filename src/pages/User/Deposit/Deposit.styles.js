import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH } from '../../../../constants/constants';
import colors from '../../../../styles/colors';

export default StyleSheet.create({
  textLeft: {
    textAlign: 'left',
    width: '100%',
    color: colors.black,
  },
  copy: {
    position: 'relative',
    top: DEVICE_WIDTH <= 360 ? -32 : -33,
    left: '-35%',
  },
});
