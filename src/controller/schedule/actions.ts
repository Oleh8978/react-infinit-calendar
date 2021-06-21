import { appName } from '../../config';
import { createAsyncAction } from 'typesafe-actions';
import { IException } from '../model';
import {
  DayOffCreateRequest,
  DayOffCreateResponse,
  DayOffDeleteRequest,
  DayOffDeleteResponse,
  DayOffGetListRequest,
  DayOffGetListResponse,
  TimeSlotGetListExpandedResponse,
  TimeSlotGetListRequest,
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

export const getDaysOffAction = createAsyncAction(
  `${appName}/${widgetName}/get_day_off_request`,
  `${appName}/${widgetName}/get_day_off_success`,
  `${appName}/${widgetName}/get_day_off_filed`,
)<
  DayOffGetListRequest,
  {
    response: DayOffGetListResponse;
    additionalFields: DayOffGetListRequest;
  },
  IException
>();

export const setDayOffAction = createAsyncAction(
  `${appName}/${widgetName}/set_day_off_request`,
  `${appName}/${widgetName}/set_day_off_success`,
  `${appName}/${widgetName}/set_day_off_filed`,
)<
  DayOffCreateRequest,
  {
    response: DayOffCreateResponse;
    additionalFields: DayOffCreateRequest;
  },
  IException
>();

export const deleteDayOffAction = createAsyncAction(
  `${appName}/${widgetName}/delete_day_off_request`,
  `${appName}/${widgetName}/delete_day_off_success`,
  `${appName}/${widgetName}/delete_day_off_filed`,
)<
  DayOffDeleteRequest,
  {
    response: DayOffDeleteResponse;
    additionalFields: DayOffDeleteRequest;
  },
  IException
>();
