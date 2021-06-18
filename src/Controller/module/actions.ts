import { appName } from '../../Config';
import { createAsyncAction } from 'typesafe-actions';
import { IException } from '../model';
import {
  ModuleGetResponse,
  TaskExecuteCreateRequest,
  TaskExecuteCreateResponse, TaskExecuteDeleteResponse,
  TimeSlotGetListByModuleRequest,
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

export const toggleExecuteTaskAction = createAsyncAction(
  `${appName}/${widgetName}/toggle_execute_task_request`,
  `${appName}/${widgetName}/toggle_execute_task_success`,
  `${appName}/${widgetName}/toggle_execute_task_filed`,
)<
  TaskExecuteCreateRequest & {
    timeSlot: number;
    module?: number;
    action: 'create' | 'remove';
    callback: (state: boolean) => void;
  },
  {
    response: TaskExecuteCreateResponse | TaskExecuteDeleteResponse;
    additionalFields?: TaskExecuteCreateRequest & {
      timeSlot: number;
      module?: number;
      action: 'create' | 'remove';
    };
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
