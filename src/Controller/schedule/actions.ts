import { appName } from '../../Config';
import { createAsyncAction } from 'typesafe-actions';
import { IException } from '../model';
import {
  TimeSlotGetListExpandedResponse, TimeSlotGetListRequest,
  TimeSlotGetPreviouslyUncompletedListRequest,
} from '@ternala/frasier-types';

export const widgetName = 'schedule';

export const getScheduleAction = createAsyncAction(
  `${appName}/${widgetName}/get_schedule_request`,
  `${appName}/${widgetName}/get_schedule_success`,
  `${appName}/${widgetName}/get_schedule_filed`,
)<
  TimeSlotGetListRequest,
  {
    response: TimeSlotGetListExpandedResponse;
    searchParams: TimeSlotGetListRequest;
  },
  IException
>();

export const getUncompletedTimeSlotsAction = createAsyncAction(
  `${appName}/${widgetName}/get_uncompleted_time_slots_request`,
  `${appName}/${widgetName}/get_uncompleted_time_slots_success`,
  `${appName}/${widgetName}/get_uncompleted_time_slots_filed`,
)<
  TimeSlotGetPreviouslyUncompletedListRequest,
  {
    response: TimeSlotGetListExpandedResponse;
    searchParams: TimeSlotGetPreviouslyUncompletedListRequest;
  },
  IException
>();
