import { createAction, createAsyncAction } from 'typesafe-actions';

import { appName } from '@app/config/index';

// interfaces
import {
  ISetLoadingAction
} from './models';

// const for ath actions
export const widgetName = 'SURVEYTITLE';

// loading action
export const setLoadingAction = createAction(
  `${appName}/${widgetName}/SET_ISLOADING_STATUS`,
)<ISetLoadingAction>();

// ** Action

export const getSurveyTitle = createAsyncAction(
  `${appName}/${widgetName}/CREATE_REQUEST`,
  `${appName}/${widgetName}/CREATE_SUCCESS`,
  `${appName}/${widgetName}/CREATE_FAILED`,
)<number, any, any>();
