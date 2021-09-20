import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';

export default StyleSheet.create({
  header: {
    width: '100%',
    paddingLeft: '5%',
  },
  filterImage: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 0,
    top: 9,
  },
  filtersWrapper: {
    flexDirection: 'row',
  },
  filter: {
    width: 125,
    height: 30,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  filterText: {
    marginRight: 5,
    fontSize: 15,
  },
  filterCounter: {
    width: 24,
    height: 24,
    marginLeft: -5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.purpleLight,
  },
  filterCoins: {
    width: 24,
    height: 29,
    marginLeft: -5,
    marginRight: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.purpleLight,
  },
  chevronDown: {
    position: 'absolute',
    right: 7,
    top: 13,
    width: 20,
    height: 20,
  },
  shadow: {
    position: 'absolute',
    right: -2,
    bottom: 13,
    height: 32,
    opacity: 0.9,
    width: '7%',
  },
  transactionsWrapper: {
    paddingHorizontal: '5%',
    width: '100%',
  },
  transaction: {
    width: '100%',
    paddingHorizontal: 10,
    paddingRight: 15,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.greyLight,
  },
  transactionDate: {
    alignItems: 'flex-end',
  },
  transactionValues: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boldText: {
    fontFamily: 'OpenSans-SemiBold',
  },
});
