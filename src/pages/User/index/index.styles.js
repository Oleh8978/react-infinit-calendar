import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';

export default StyleSheet.create({
  activeTab: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.purple,
    borderTopWidth: 3,
  },
  tab: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.white,
    borderTopWidth: 3,
  },
});
