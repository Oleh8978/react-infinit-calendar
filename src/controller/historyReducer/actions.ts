import { appName } from '@app/config/index';
import { createAction } from 'typesafe-actions';
import { IHistoryStep } from './models';

export const widgetName = 'history';

// actions
export const pushHistoryState = createAction(
  `${appName}/${widgetName}/PUSH_HISTORY_STATE`,
)<IHistoryStep>();
export const popHistoryState = createAction(
  `${appName}/${widgetName}/POP_HISTORY_STATE`,
)<undefined>();
export const setHistoryState = createAction(
  `${appName}/${widgetName}/SET_HISTORY_STATE`,
)<IHistoryStep>();
