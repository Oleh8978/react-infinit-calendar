import { StyleSheet } from 'react-native';
import { questionWrapper } from '../../../../styles/mixins';
import colors from '../../../../styles/colors';

export default StyleSheet.create({
  textLeft: {
    textAlign: 'left',
    width: '100%',
  },
  question: {
    ...questionWrapper,
    right: 0,
    borderRadius: 5,
  },
  subBlockHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingVertical: 13,
  },
  value: {
    fontSize: 18,
    color: colors.purple,
  },
});
