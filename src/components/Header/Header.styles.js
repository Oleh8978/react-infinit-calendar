import { StyleSheet } from 'react-native';
import { view } from '../../../styles/mixins';

import { DEVICE_WIDTH } from '../../../constants/constants';

export default StyleSheet.create({
  wrapper: {
    ...view,
    marginTop: 20,
  },
  header: {
    width: '100%',
  },
  backArrow: {
    width: 125,
    height: 125,
    position: 'absolute',
    top: 6,
    left: '3%',
    zIndex: 1,
  },
  topText: {
    fontFamily: 'OpenSans-SemiBold',
    textAlign: 'center',
    fontSize: DEVICE_WIDTH <= 375 ? 22 : 26,
  },
  bottomText: {
    marginTop: 10,
    paddingHorizontal: '15%',
    textAlign: 'center',
    fontSize: 15,
  },
});
