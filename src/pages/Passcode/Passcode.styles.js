import { StyleSheet } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../constants/constants';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  codeContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DEVICE_HEIGHT > 736 ? 80 : 40 && DEVICE_WIDTH <= 360 ? 20 : 40,
  },
  codeTransparent: {
    width: 17,
    height: 17,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.purple,
  },
  codeFill: {
    width: 17,
    height: 17,
    borderRadius: 13,
    backgroundColor: colors.purple,
  },
  numberContainerWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    width: DEVICE_WIDTH <= 360 ? '75%' : 275,
    marginTop: DEVICE_HEIGHT > 736 ? 70 : 50 && DEVICE_WIDTH <= 360 ? 20 : 50,
  },
  number: {
    width: 75,
    height: 75,
    borderRadius: 75,
    borderColor: colors.purple,
    borderWidth: 1,
    margin: DEVICE_WIDTH > 736 ? 14 : 7 && DEVICE_WIDTH <= 360 ? 2 : 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.greyOpacity,
  },
  numberText: {
    fontSize: 36,
    color: colors.purple,
    letterSpacing: 0,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: DEVICE_HEIGHT > 736 ? 80 : 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingLeft: 5,
    paddingRight: 5,
    width: 110,
    height: 55,
    borderRadius: 25,
    borderColor: colors.purple,
    borderWidth: 1,
    backgroundColor: colors.purple,
    justifyContent: 'center',
  },
});
