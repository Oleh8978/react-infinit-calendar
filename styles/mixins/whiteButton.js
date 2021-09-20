import colors from '../colors';

import { DEVICE_WIDTH } from '../../constants/constants';

export default {
  width: DEVICE_WIDTH <= 360 ? 290 : 350,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginVertical: DEVICE_WIDTH <= 360 ? 4 : 5,
  marginBottom: DEVICE_WIDTH <= 360 ? 10 : 20,
  paddingVertical: DEVICE_WIDTH <= 360 ? 8 : 10,
  paddingHorizontal: DEVICE_WIDTH <= 360 ? 15 : 20,
  borderRadius: 90,
  borderWidth: 1,
  borderColor: colors.greyLight,
  backgroundColor: colors.white,
};
