import { createAction, createAsyncAction } from 'typesafe-actions';

import { appName } from '@app/config';

// interfaces
import {
  IfaqState,
  IsubmitData,
  IloaderState,
  IsubmitDataRequest,
} from './models';

// widjet name
export const widgetName = 'FAQ';

// loading action
export const setLoadingAction = createAction(
  `${appName}/${widgetName}/SET_LOADING_STATUS`,
)<IloaderState>();

export const submitAnswer = createAsyncAction(
  `${appName}/${widgetName}/POST_FAQ_REQUEST`,
  `${appName}/${widgetName}/POST_FAQ_SUCCESS`,
  `${appName}/${widgetName}/POST_FAQ_FAILURE`,
)<IsubmitDataRequest, IsubmitData, any[]>();
