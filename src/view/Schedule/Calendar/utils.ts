import React from 'react';

import { ICalendarDates } from '../Models';

export const date = new Date();

export const getMonthOfYear = () => {
  const dateObj = new Date();
};

export const leapYear = (year) => {
  if (year % 4 == 0) return true;
  return false;
};

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const getDayInWeek = (time) => {
  // if (
  //   new Date(
  //     new Date(time).getDate(),
  //     new Date(time).getMonth(),
  //     new Date(time).getFullYear(),
  //   ).getDay() -
  //     1 >
  //   0
  // ) {
  //   return days[
  //     new Date(
  //       new Date(time).getDate(),
  //       new Date(time).getMonth(),
  //       new Date(time).getFullYear(),
  //     ).getDay() - 1
  //   ];
  // } else {
  //   return days[6];
  // }
  return new Date(time).toLocaleDateString('us-US', { weekday: 'short' });
};

export const getDays = (month, year) => {
  // create array to hold number of days in each month
  const ar = new Array(12);
  ar[0] = 31; // January
  ar[1] = leapYear(year) ? 29 : 28; // February
  ar[2] = 31; // March
  ar[3] = 30; // April
  ar[4] = 31; // May
  ar[5] = 30; // June
  ar[6] = 31; // July
  ar[7] = 31; // August
  ar[8] = 30; // September
  ar[9] = 31; // October
  ar[10] = 30; // November
  ar[11] = 31; // December

  // return number of days in the specified month (parameter)
  return ar[month];
};

export const getMonthName = (month) => {
  // create array to hold name of each month
  const ar = new Array(12);
  ar[0] = 'January';
  ar[1] = 'February';
  ar[2] = 'March';
  ar[3] = 'April';
  ar[4] = 'May';
  ar[5] = 'June';
  ar[6] = 'July';
  ar[7] = 'August';
  ar[8] = 'September';
  ar[9] = 'October';
  ar[10] = 'November';
  ar[11] = 'December';

  // return name of specified month (parameter)
  return ar[month];
};

export const getMonthNameShort = (month) => {
  // create array to hold name of each month
  const ar = new Array(12);
  ar[0] = 'Jan';
  ar[1] = 'Feb';
  ar[2] = 'Mar';
  ar[3] = 'Apr';
  ar[4] = 'May';
  ar[5] = 'Jun';
  ar[6] = 'Jul';
  ar[7] = 'Aug';
  ar[8] = 'Sep';
  ar[9] = 'Oct';
  ar[10] = 'Nov';
  ar[11] = 'Dec';

  // return name of specified month (parameter)
  return ar[month];
};

export const dateCreator = (day: number, month: number, year: number): Date => {
  // let date = '';

  // if (day < 10 && month < 10) {
  //   return (date = '0' + month + '-0' + day + '-' + year);
  // }

  // if (day < 10 && month >= 10) {
  //   return (date = '' + month + '-0' + day + '-' + year);
  // }

  // if (day >= 10 && month >= 10) {
  //   return (date = month + '-' + day + '-' + year);
  // }

  // if (day >= 10 && month < 10) {
  //   return (date = '0' + month + '-' + day + '-' + year);
  // }

  return new Date(year, month - 1, day);
};

export const monthArr = (
  month: number,
  year: number,
  arr: ICalendarDates[],
): ICalendarDates[] => {
  for (let i = 0; i < getDays(month, year); i++) {
    arr.push({
      number: i + 1,
      date: dateCreator(i + 1, month + 1, year),
      name: getDayInWeek(new Date(year, month, i + 1)),
      hasAnyEvents: false,
      isClicked: false,
    });
  }
  return arr;
};

export const dayInCalendar = (day: Date, num: number) => {
  const firstDay = new Date(new Date(day).getTime());
  return new Date(firstDay.setDate(new Date(day).getDate() + num)).getDate();
};

export const getNextDate = (day: Date, num: number) => {
  const firstDay = new Date(new Date(day).getTime());
  return new Date(
    new Date(firstDay.setDate(new Date(day).getDate() + num)).setHours(0, 0, 0),
  );
};

export const currentWeekedays = (
  month: number,
  year: number,
  arr: ICalendarDates[],
): ICalendarDates[] => {
  const firstDay = new Date(new Date().getTime());
  firstDay.setDate(new Date().getDate() - 4);
  for (let i = 1; i < 8; i++) {
    arr.push({
      number: dayInCalendar(firstDay, i),
      date: getNextDate(firstDay, i),
      name: getDayInWeek(new Date(year, month, dayInCalendar(firstDay, i))),
      hasAnyEvents: false,
      isClicked: false,
    });
  }
  return arr;
};
