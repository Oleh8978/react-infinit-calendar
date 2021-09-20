import { formWrapper } from '../../../../styles/mixins';

export default {
  formWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    position: 'relative',
    top: -20,
  },
  form: {
    ...formWrapper,
    justifyContent: 'space-between',
    flex: 1,
  },
  scrollableFormBody: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
  },
};
