import colors from '../colors';

import { DEVICE_WIDTH } from '../../constants/constants';

export default {
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottomWidth: 1,
  borderColor: colors.greyLight,
  paddingVertical: DEVICE_WIDTH <= 360 ? 7 : 13,
  paddingHorizontal: DEVICE_WIDTH <= 360 ? 7 : 15,
};
