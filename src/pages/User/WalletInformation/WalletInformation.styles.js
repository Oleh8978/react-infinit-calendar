import { StyleSheet } from 'react-native';
import { accPageWrapper as wrapper } from '../../../../styles/mixins';
import colors from '../../../../styles/colors';

import { DEVICE_WIDTH } from '../../../../constants/constants';

export default StyleSheet.create({
  wrapper: {
    ...wrapper,
    justifyContent: 'space-between',
  },
  currencyLogo: {
    width: 64,
    height: 64,
  },
  walletValues: {
    marginTop: 10,
  },
  currency: {
    fontSize: DEVICE_WIDTH <= 360 ? 17 : 25,
    color: colors.purple,
  },
  blockHeaderText: {
    fontSize: 13,
    color: colors.black,
  },
  value: {
    fontSize: DEVICE_WIDTH <= 360 ? 17 : 25,
    color: colors.purple,
  },
  valueBold: {
    color: colors.purple,
    fontFamily: 'OpenSans-Bold',
    fontSize: DEVICE_WIDTH <= 360 ? 17 : 25,
  },
  button: {
    marginBottom: 20,
  },
  greyText: {
    fontSize: 12,
    color: colors.grey,
  },
});
