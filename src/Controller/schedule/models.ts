import {
  IDayWithTimeSlots,
  TimeSlotGetListRequest,
} from '@ternala/frasier-types';

export const model = '';

import { defaultState } from '../based';

export interface IScheduleState extends defaultState {
  timeSlotData: IDayWithTimeSlots;
  uncompletedTimeSlotData: IDayWithTimeSlots;
  storedSearchParams: TimeSlotGetListRequest | null;
}