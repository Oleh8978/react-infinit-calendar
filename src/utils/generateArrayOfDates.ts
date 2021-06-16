import { Moment } from 'moment';

export const generateArrayOfDates = (
  startDate: Moment,
  endDate: Moment,
): Moment[] => {
  const now: Moment = startDate.clone();
  const dates: Moment[] = [];

  while (now.isSameOrBefore(endDate)) {
    dates.push(now.clone());
    now.add(1, 'days');
  }
  return dates;
};
