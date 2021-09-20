import { StyleSheet } from 'react-native';
import { questionWrapper } from '../../../styles/mixins';
import colors from '../../../styles/colors';
import { DEVICE_WIDTH } from '../../../constants/constants';

export default StyleSheet.create({
  question: {
    ...questionWrapper,
    right: 0,
    top: -13,
    borderTopRightRadius: 5,
    height: DEVICE_WIDTH <= 360 ? 15 : 18,
  },
  blockHeaderText: {
    color: colors.black,
  },
  value: {
    fontSize: 18,
    color: colors.purple,
  },
  valueCurrency: {
    fontSize: 11,
    color: colors.purple,
  },
});
