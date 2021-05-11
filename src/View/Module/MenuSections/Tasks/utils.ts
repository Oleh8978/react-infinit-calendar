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

export const isDateInThePast = (date: string): boolean => {
  if (
    new Date().setHours(0, 0, 0, 0) - new Date(date).setHours(0, 0, 0, 0) >
    0
  ) {
    return true;
  } else if (
    new Date().setHours(0, 0, 0, 0) - new Date(date).setHours(0, 0, 0, 0) ===
    0
  ) {
    return false;
  } else if (
    new Date().setHours(0, 0, 0, 0) - new Date(date).setHours(0, 0, 0, 0) <
    0
  ) {
    return false;
  }
};

export const mostClosestDate = (arr) => {
  const arrDiff = [];
  if (
    arr.find(
      (item) =>
        new Date(item.time).setHours(0, 0, 0, 0) ===
        new Date().setHours(0, 0, 0, 0),
    ) === undefined
  ) {
    arr.map((item) => {
      arrDiff.push({
        dif:
          Math.abs(new Date(item.time).getTime() - new Date().getTime()) /
          (1000 * 3600 * 24),
        itemDate: item.time,
      });
    });
  }

  return arrDiff
    .sort((a, b) => {
      return +new Date(b.dif) - +new Date(a.dif);
    })
    .reverse()[0].itemDate;
};
