import { createAction, createAsyncAction } from 'typesafe-actions';

// app name
import { appName } from '@app/config/index';

//Interfaces
import { IModalWindowState } from './models';

// const for ath actions
export const widgetName = 'MODAL_WINDOW';

// remove item localy
export const setModalWindowOpened = createAction(
  `${appName}/${widgetName}/SATUS_ACTION`,
)<IModalWindowState>();
