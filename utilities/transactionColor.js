import colors from '../styles/colors';

export default (type) => {
  switch (type) {
    case 'deposits':
      return colors.green;
    case 'withdraws':
      return colors.red;
    case 'transfers':
      return colors.blue;
    case 'repays':
      return colors.orange;
    default:
      return colors.black;
  }
};
