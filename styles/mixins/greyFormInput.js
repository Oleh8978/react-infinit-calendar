import Platform from 'react-native';
import colors from '../colors';

export default {
  width: '100%',
  height: 50,
  maxWidth: 375,
  marginTop: -15,
  paddingBottom: Platform.OS === 'android' ? 8 : 0,
  paddingLeft: 15,
  paddingRight: 15,
  borderRadius: 12,
  backgroundColor: colors.greyLight,
  color: colors.purple,
};
