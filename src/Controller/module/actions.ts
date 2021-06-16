import { appName } from '../../Config';
import { createAsyncAction } from 'typesafe-actions';
import { IException } from '../model';
import {
  ModuleGetResponse, TimeSlotGetListByModuleRequest,
  TimeSlotGetListExpandedResponse,
  TimeSlotGetPreviouslyUncompletedListRequest,
} from '@ternala/frasier-types';

export const widgetName = 'module';

export const getModuleAction = createAsyncAction(
  `${appName}/${widgetName}/get_module_request`,
  `${appName}/${widgetName}/get_module_success`,
  `${appName}/${widgetName}/get_module_filed`,
)<
  { id: number },
  {
    response: ModuleGetResponse;
  },
  IException
>();

export const getScheduleAction = createAsyncAction(
  `${appName}/${widgetName}/get_schedule_request`,
  `${appName}/${widgetName}/get_schedule_success`,
  `${appName}/${widgetName}/get_schedule_filed`,
)<
  TimeSlotGetListByModuleRequest,
  {
    response: TimeSlotGetListExpandedResponse;
    searchParams: TimeSlotGetListByModuleRequest;
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
