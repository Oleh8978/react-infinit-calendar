import colors from '../colors';

import { DEVICE_WIDTH } from '../../constants/constants';

export default {
  width: '100%',
  marginBottom: DEVICE_WIDTH <= 360 ? 10 : 20,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 10,
  shadowOffset: {
    width: 3,
    height: 3,
  },
  shadowColor: 'black',
  shadowOpacity: 0.15,
  borderRadius: 10,
  borderColor: colors.greyLight,
  borderWidth: 1,
  backgroundColor: colors.white,
};
