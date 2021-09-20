import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  calendarHeader: {
    marginTop: -150,
    position: 'relative',
    top: 100,
    paddingTop: 19,
    alignItems: 'center',
  },
  hr: {
    position: 'absolute',
    width: '110%',
    height: 1,
    backgroundColor: colors.greyLight,
  },
  weekWrapper: {
    width: '100%',
    position: 'absolute',
    top: 70,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: '9%',
    paddingRight: '5%',
  },
  weekDayName: {
    letterSpacing: 15.3,
  },
});
