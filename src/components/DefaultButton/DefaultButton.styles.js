import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  button: {
    maxWidth: '100%',
    paddingHorizontal: '5%',
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: colors.purple,
    borderWidth: 1,
    marginBottom: 0,
  },
  loader: {
    position: 'absolute',
    right: 10,
    top: 11,
  },
});
