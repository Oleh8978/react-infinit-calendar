import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH } from '../../../../constants/constants';
import colors from '../../../../styles/colors';

export default StyleSheet.create({
  textWrapper: {
    paddingHorizontal: '5%',
  },
  mainText: {
    fontSize: 21,
    textAlign: 'center',
    marginBottom: '5%',
  },
  subText: {
    fontSize: 15,
    textAlign: 'center',
  },
  timer: {
    position: 'absolute',
    left: 30,
    top: DEVICE_WIDTH <= 360 ? 9 : 10,
    zIndex: 1,
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: colors.white,
  },
});
