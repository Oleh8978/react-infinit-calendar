import { createAction, createAsyncAction } from 'typesafe-actions';

import { appName } from '@app/config';

//Interfaces
import { IStatisticState } from './models';
import { IException } from '@app/controller/model';
import { StatisticGetJourneyResponse } from '@ternala/frasier-types';

// const for ath actions
export const widgetName = 'journeyStatistic';

// ** Action
// export const setLoaderState = createAction(
//   `${appName}/${widgetName}/SET_LOADER`,
// )<ILoaderState>();

export const getJourneyStatisticAction = createAsyncAction(
  `${appName}/${widgetName}/GET_STATISTIC_REQUEST`,
  `${appName}/${widgetName}/GET_STATISTIC_SUCCESS`,
  `${appName}/${widgetName}/GET_STATISTIC_FAILURE`,
)<{ id: number }, { response: StatisticGetJourneyResponse }, IException>();
