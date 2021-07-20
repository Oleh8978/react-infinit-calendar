import { createAction, createAsyncAction } from 'typesafe-actions';

import { appName } from '@app/config/index';

//Interfaces
import { IExpertsSearchParams, ISetLoadingAction } from './models';

import {
  ExpertGetListRequest,
  ExpertGetListResponse,
} from '@ternala/frasier-types';

// const for ath actions
export const widgetName = 'EXPERTS';

// loading action
export const setLoadingAction = createAction(
  `${appName}/${widgetName}/SET_ISLOADING_STATUS`,
)<ISetLoadingAction>();

export const getExpersList = createAsyncAction(
  `${appName}/${widgetName}/GET_EXPERTS_REQUEST`,
  `${appName}/${widgetName}/GET_EXPERTS_SUCCESS`,
  `${appName}/${widgetName}/GET_EXPERTS_FAILED`,
)<
  ExpertGetListRequest & { callback?: any },
  {
    response: ExpertGetListResponse;
    searchParams: IExpertsSearchParams;
  },
  ISetLoadingAction
>();
