import shadow from './shadow';
import colors from '../colors';

import { DEVICE_WIDTH } from '../../constants/constants';

export default {
  ...shadow,
  width: '100%',
  maxWidth: DEVICE_WIDTH <= 360 ? 290 : 360,
  marginBottom: 20,
  justifyContent: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 15,
  paddingVertical: 15,
  borderWidth: 1,
  borderRadius: 12,
  borderColor: colors.greyLight,
  backgroundColor: colors.white,
};
