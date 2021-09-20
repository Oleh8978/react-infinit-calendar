import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';
import { formWrapper as modal } from '../../../styles/mixins';

export default StyleSheet.create({
  filterModal: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
    margin: 0,
  },
  filterModalBody: {
    ...modal,
    top: 0,
    justifyContent: 'flex-end',
    paddingTop: 65,
    paddingBottom: 15,
  },
  sliderWrapper: {
    position: 'absolute',
    top: 10,
    width: '100%',
    alignItems: 'center',
  },
  slider: {
    width: '50%',
    height: 2,
    borderRadius: 9,
    backgroundColor: colors.grey,
  },
  modalHeader: {
    position: 'absolute',
    top: 35,
    fontFamily: 'OpenSans-Bold',
  },
});
