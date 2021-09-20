import colors from '../colors';

import { DEVICE_WIDTH } from '../../constants/constants';

export default {
  width: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: DEVICE_WIDTH <= 360 ? 7 : 15,
  paddingHorizontal: DEVICE_WIDTH <= 360 ? 7 : 10,
  borderColor: colors.greyLight,
  borderRightWidth: 1,
};
