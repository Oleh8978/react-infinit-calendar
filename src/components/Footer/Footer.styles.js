import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH } from '../../../constants/constants';

export default StyleSheet.create({
  contactSupport: {
    width: 180,
    marginTop: DEVICE_WIDTH <= 360 ? 7 : 15,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 3,
    borderWidth: 1,
    borderRadius: 15,
  },
});
