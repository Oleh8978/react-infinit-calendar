import { createAction, createAsyncAction } from 'typesafe-actions';
// interfaces

import { appName } from '@app/config';
import { IException, IJourneyState } from './models';
import { JourneyGetResponse, StatisticByJourneyRequest, StatisticGetJourneyResponse } from '@ternala/frasier-types';

// const for ath actions
export const widgetName = 'journey';

//Actions
export const getJourneyDataAction = createAsyncAction(
  `${appName}/${widgetName}/GET_JOURNEY_REQUEST`,
  `${appName}/${widgetName}/GET_JOURNEY_SUCCESS`,
  `${appName}/${widgetName}/GET_JOURNEY_FAILED`,
)<number, JourneyGetResponse, IException>();

export const getJourneyStatisticAction = createAsyncAction(
  `${appName}/${widgetName}/GET_JOURNEY_STATISTIC_REQUEST`,
  `${appName}/${widgetName}/GET_JOURNEY_STATISTIC_SUCCESS`,
  `${appName}/${widgetName}/GET_JOURNEY_STATISTIC_FAILED`,
)<StatisticByJourneyRequest, StatisticGetJourneyResponse, IException>();

export const LoaderAction = createAction(`${widgetName}/SET_LOADER_ACTION`)<{
  code?: number | undefined | string;
  message?: string;
  isLoading: boolean;
  error?: boolean;
}>();
