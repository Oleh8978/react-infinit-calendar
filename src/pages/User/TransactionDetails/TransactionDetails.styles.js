import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';
import { accPageWrapper as body } from '../../../../styles/mixins';

export default StyleSheet.create({
  transactionLogoBack: {
    position: 'absolute',
    bottom: -30,
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: colors.white,
    borderRadius: 30,
    justifyContent: 'center',
    zIndex: 1,
  },
  transactionTypeText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 21,
  },
  transactionLogoColor: {
    width: 50,
    height: 50,
    borderRadius: 360,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    ...body,
    marginTop: 40,
    minHeight: '100%',
    justifyContent: 'space-between',
  },
  block: {
    width: '100%',
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: colors.greyLight,
  },
  row: {
    paddingRight: 40,
  },
  topText: {
    fontSize: 15,
    color: colors.grey,
  },
  bottomText: {
    color: colors.black,
    marginBottom: 7,
    fontSize: 19,
  },
});
