export const getDifIndates = (dayPrev: string, dayNext: string): number => {
  return (
    (new Date(dayNext).getTime() - new Date(dayPrev).getTime()) /
    (1000 * 3600 * 24)
  );
};

export const formatAMPM = (date: any): any => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm + ' ';
  return strTime;
};

const join = (t, a, s) => {
  const format = (m) => {
    const f = new Intl.DateTimeFormat('en', m);
    return f.format(t);
  };
  return a.map(format).join(s);
};

export const numDayShortMonth = (date) => {
  const dayOption = [{ month: 'short' }, { day: 'numeric' }];
  return join(new Date(date), dayOption, ' ');
};
