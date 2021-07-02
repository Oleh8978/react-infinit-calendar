export const entryValidator = (name: string, text: string) => {
  switch (name) {
    case 'firstName':
      return text.replace(/[^a-zA-Z ]/g, '');
    case 'lastName':
      return text.replace(/[^a-zA-Z ]/g, '');
    case 'image':
      break;
    case 'email':
      return text.toLowerCase().replace(/[$&+,:;=?#|'<>^*()%!]/g, '')
    case 'phone':
      return text.toLowerCase().replace(/[^0-9+()]+/g, '');
    case 'timezone':
      break;
    case 'street':
      return text.replace(/[$&+,:;=?@#|'<>^*()%!]/g, '');
    case 'zipCode':
      return text.replace(/[^0-9]+/g, '');
    case 'city':
      return text.replace(/[^a-zA-Z ]/g, '');
    case 'state':
      return text.replace(/[^a-zA-Z ]/g, '');
    case 'startTime':
      break;
    default:
      return text.trim();
  }
};
