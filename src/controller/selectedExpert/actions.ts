import { createAction, createAsyncAction } from 'typesafe-actions';

// app name
import { appName } from '@app/config/index';

//Interfaces
import { ISelectedExpert } from './models';

// const for ath actions
export const widgetName = 'SELECTED_EXPERT';

// remove item localy
export const setSelectedExpert = createAction(
  `${appName}/${widgetName}/SATUS_ACTION`,
)<ISelectedExpert>();
