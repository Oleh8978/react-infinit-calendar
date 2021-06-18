import { toggleExecuteTaskAction } from '../Controller/module/actions';

export const LoaderAction = {
  schedule: {
    getSchedule: 'get schedule',
    getUncompletedTimeSlots: 'get uncompleted time slots',
    getDaysOff: 'get days off',
    setDayOff: 'set day off',
    deleteDayOff: 'delete day off',
  },
  module: {
    getModule: 'get module',
    toggleExecuteTask: 'execute task',
    getSchedule: 'get schedule',
    getUncompletedTimeSlots: 'get uncompleted time slots',
  },
};

export const limitGetScheduleDays = 3;
export const limitGetModuleScheduleDays = 3;
export const defaultUserStartTime = 540;
