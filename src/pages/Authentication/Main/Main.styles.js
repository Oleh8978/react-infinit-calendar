import { StyleSheet } from 'react-native';
import { authPageWrapper as wrapper } from '../../../../styles/mixins';
import colors from '../../../../styles/colors';

export default StyleSheet.create({
  main: {
    ...wrapper,
    backgroundColor: colors.purple,
    paddingBottom: 40,
  },
  logo: {
    marginBottom: 25,
  },
  textsWrapper: {
    marginBottom: 10,
    textAlign: 'center',
    color: colors.white,
  },
  welcome: {
    fontFamily: 'OpenSans-Bold',
  },
  logoText: {
    marginTop: 7,
    marginBottom: 15,
  },
  test: {
    position: 'relative',
    bottom: 10,
    fontFamily: 'OpenSans-Bold',
    fontSize: 37,
    color: colors.white,
  },
  meet: {
    fontSize: 28,
  },
});
