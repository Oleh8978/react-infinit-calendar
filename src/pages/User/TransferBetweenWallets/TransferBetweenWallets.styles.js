import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';

export default StyleSheet.create({
  text: {
    width: '100%',
    color: colors.black,
  },
  body: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingBottom: 20,
  },
  subBlockHeader: {
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 13,
    paddingHorizontal: 10,
  },
  value: {
    fontSize: 18,
    color: colors.purple,
  },
  valueCurrency: {
    fontSize: 11,
    color: colors.purple,
  },
  valueGrey: {
    fontSize: 12,
    color: colors.grey,
  },
  amountRate: {
    width: '100%',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  goBack: {
    position: 'absolute',
    top: 60,
    left: '5%',
  },
});
