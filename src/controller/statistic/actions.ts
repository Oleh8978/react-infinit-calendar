import { createAction, createAsyncAction } from 'typesafe-actions';

import { appName } from '@app/config';

//Interfaces
import { ILoaderState, IErrorState, IstatisticToday } from './models';

// const for ath actions
export const widgetName = 'STATISTIC';

// ** Action
export const setLoaderState = createAction(
  `${appName}/${widgetName}/SET_LOADERSTATUS_STATISTIC_STATUS`,
)<ILoaderState>();

export const getStatisticToday = createAsyncAction(
  `${appName}/${widgetName}/STATISTIC_TODAY_REQUEST`,
  `${appName}/${widgetName}/STATISTIC_TODAY_SUCCESS`,
  `${appName}/${widgetName}/STATISTIC_TODAY_FAILURE`,
)<any, IstatisticToday, IErrorState>();
