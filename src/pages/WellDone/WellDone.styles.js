import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 60,
  },
  wellDoneText: {
    fontSize: 36,
    fontFamily: 'OpenSans-SemiBold',
  },
});
