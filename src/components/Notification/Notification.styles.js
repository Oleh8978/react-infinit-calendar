import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  notification: {
    position: 'absolute',
    width: '100%',
    maxHeight: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
    paddingTop: '10%',
    paddingBottom: 10,
    zIndex: 1,
  },
  attention: {
    height: '100%',
    paddingTop: 10,
    justifyContent: 'center',
  },
  text: {
    maxWidth: '80%',
    minHeight: 40,
    paddingVertical: 20,
    marginHorizontal: 20,
    fontFamily: 'OpenSans-SemiBold',
    flex: 1,
    flexWrap: 'wrap',
    color: colors.white,
  },
  close: {
    position: 'absolute',
    top: 25,
    right: 20,
  },
});
