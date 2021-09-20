import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';
import { questionWrapper } from '../../../../styles/mixins';

import { DEVICE_WIDTH } from '../../../../constants/constants';

export default StyleSheet.create({
  headerWrapper: {
    height: '30%',
    minHeight: 170,
    backgroundColor: colors.purple,
  },
  header: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    justifyContent: 'center',
    paddingBottom: 15,
    paddingLeft: DEVICE_WIDTH <= 360 ? '45%' : '40%',
  },
  card: {
    width: '50%',
    position: 'absolute',
    left: '-14%',
  },
  shadow: {
    position: 'absolute',
    left: '-6%',
    height: '100%',
    width: '15%',
    zIndex: 2,
  },
  bankingOfCryptoText: {
    fontSize: 19,
    color: colors.white,
    fontFamily: 'OpenSans-Bold',
  },
  bankingOfCryptoSubText: {
    marginTop: 5,
    color: colors.white,
    fontSize: 11,
    zIndex: 2,
  },
  bankingOfCryptoBoldText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 10,
  },
  question: {
    ...questionWrapper,
    left: 0,
    top: 0,
    borderTopLeftRadius: 6,
  },
  blockHeaderText: {
    textAlign: 'center',
    fontSize: DEVICE_WIDTH <= 360 ? 12 : 13,
    color: colors.black,
  },
  value: {
    fontSize: 18,
    color: colors.purple,
  },
  valueWrapper: {
    flexDirection: 'row',
  },
  number: {
    fontSize: DEVICE_WIDTH <= 360 ? 15 : 18,
    color: colors.purple,
  },
  valueCurrency: {
    fontSize: 11,
    color: colors.purple,
    alignSelf: 'flex-end',
    paddingBottom: 2,
  },
  chevron: {
    position: 'absolute',
    right: -15,
    top: 10,
  },
  currency: {
    fontFamily: 'OpenSans-Bold',
    marginLeft: 10,
  },
  currencyValue: {
    color: colors.purple,
  },
  defaultAndroidColor: {
    color: colors.dark,
  },
});
