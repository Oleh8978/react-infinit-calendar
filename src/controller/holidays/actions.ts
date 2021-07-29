import { createAction, createAsyncAction } from 'typesafe-actions';
// interfaces

import { appName } from '@app/config';
import { IException } from './models';
import {
  HolidayDeleteRequest,
  HolidayDeleteResponse,
  HolidayExcludeCreateRequest,
  HolidayExcludeCreateResponse,
  HolidayGetListRequest,
  HolidayGetListResponse,
  HolidayGetResponse,
} from '@ternala/frasier-types';

// const for ath actions
export const widgetName = 'holiday';

//Actions
export const getHolidayDataAction = createAsyncAction(
  `${appName}/${widgetName}/GET_HOLIDAY_REQUEST`,
  `${appName}/${widgetName}/GET_HOLIDAY_SUCCESS`,
  `${appName}/${widgetName}/GET_HOLIDAY_FAILED`,
)<HolidayGetListRequest, HolidayGetListResponse, IException>();

export const deleteHolidayDataAction = createAsyncAction(
  `${appName}/${widgetName}/DELETE_HOLIDAY_REQUEST`,
  `${appName}/${widgetName}/DELETE_HOLIDAY_SUCCESS`,
  `${appName}/${widgetName}/DELETE_HOLIDAY_FAILED`,
)<
  HolidayExcludeCreateRequest,
  HolidayExcludeCreateResponse & {
    additionalFields: HolidayExcludeCreateRequest;
  },
  IException
>();

export const LoaderAction = createAction(`${widgetName}/SET_LOADER_ACTION`)<{
  code?: number | undefined | string;
  message?: string;
  isLoading: boolean;
  error?: boolean;
}>();
