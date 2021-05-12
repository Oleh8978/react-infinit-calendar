export const dateCreatorSlashes = (day: number, month: number, year: number) => {
  let date = '';

  if (day < 10 && month < 10) {
    return (date = '0' + month + '/0' + day + '/' + year);
  }

  if (day < 10 && month >= 10) {
    return (date = '' + month + '/0' + day + '/' + year);
  }

  if (day >= 10 && month >= 10) {
    return (date = month + '/' + day + '/' + year);
  }

  if (day >= 10 && month < 10) {
    return (date = '0' + month + '/' + day + '/' + year);
  }
};
