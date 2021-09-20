import { StyleSheet } from 'react-native';

import { DEVICE_WIDTH } from '../../../constants/constants';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  input: {
    width: '100%',
    marginVertical: DEVICE_WIDTH <= 360 ? 1 : 3,
    borderColor: colors.greyLight,
    borderBottomWidth: 1,
    color: colors.black,
  },
  placeholder: {
    fontSize: 14,
    fontFamily: 'OpenSans-ExtraBold',
  },
  inputWrapper: {
    width: '100%',
    position: 'relative',
    paddingTop: 10,
  },
  eyeWrapper: {
    position: 'absolute',
    bottom: 10,
    right: 0,
  },
  eye: {
    width: 24,
    height: 24,
  },
  error: {
    position: 'absolute',
    bottom: -13,
    right: 0,
    fontSize: 11,
    color: colors.red,
  },
});
