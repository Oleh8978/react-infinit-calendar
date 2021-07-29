import { createAction, createAsyncAction } from 'typesafe-actions';

import { appName } from '@app/config';

//Interfaces
import {
  ILoaderState,
  IErrorState,
  IStatisticsListState,
  IJourney,
} from './models';

// const for ath actions
export const widgetName = 'STATISTIC_LIST';

// ** Action

export const setLoaderListState = createAction(
  `${appName}/${widgetName}/SET_LOADERSTATUS_STATISTIC_LIST_STATUS`,
)<ILoaderState>();

export const getStatisticList = createAsyncAction(
  `${appName}/${widgetName}/STATISTIC_LIST_REQUEST`,
  `${appName}/${widgetName}/STATISTIC_LIST_SUCCESS`,
  `${appName}/${widgetName}/STATISTIC_LIST_FAILURE`,
)<any, IJourney[], IErrorState>();
