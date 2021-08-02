import { createAction, createAsyncAction } from 'typesafe-actions';

// app name
import { appName } from '@app/config/index';

//Interfaces
import { ISaveBTNState } from './models';

// const for ath actions
export const widgetName = 'SAVEBTN';

// remove item localy
export const setSaveBTNStatus = createAction(
  `${appName}/${widgetName}/SATUS_ACTION`,
)<ISaveBTNState>();
