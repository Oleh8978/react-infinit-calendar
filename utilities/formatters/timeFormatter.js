const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const monthFullNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getDate = (date) => {
  const _date = new Date(date);
  const year = _date.getFullYear();
  const month = monthNames[_date.getMonth()];
  const day = _date.getDate();

  return `${month} ${day}, ${year}`;
};

export const getShortDate = (date) => {
  const _date = new Date(date);

  const year = _date.getFullYear();
  let month = _date.getMonth() + 1;
  let day = _date.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};

export const getMonthAndYear = (date) => `${monthFullNames[date.getMonth()]} ${date.getFullYear()}`;

export const getTime = (date) => {
  const _date = new Date(date);
  let hours = _date.getHours();
  let minutes = _date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours === '0' ? hours : 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes} ${ampm}`;
};

export const getDaysArray = (date1, date2) => {
  const start = date1 - date2 > 0 ? date2 : date1;
  const end = date1 - date2 > 0 ? date1 : date2;

  start.setDate(start.getDate() + 1);

  const arr = [];
  for (let dt = new Date(start); dt < end; dt.setDate(dt.getDate() + 1)) {
    arr.push(getShortDate(new Date(dt)));
  }
  return arr;
};
