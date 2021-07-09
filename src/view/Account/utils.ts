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

export const hoursConverter = (elem: number ) => {
  if (elem > 60 && Number.isInteger(elem / 60)) {
    console.log('inn 1 ')
    return elem / 60;
  }
  if (elem > 60) {
    console.log('inn 2 ')
    return (elem / 60).toFixed(2);
  }

  if (elem < 60 && elem / 60 < 1) {
    console.log('the thirs case')
    return 0
  } else if (elem < 60 && elem / 60 >= 1) {
    console.log('the fourth case ')
    return (elem / 60).toFixed(2);
  }

  console.log('no one is completed ', elem / 60, 'elem ', elem)
};
