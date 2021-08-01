import { appName } from '@app/config';
import { createAction } from 'typesafe-actions';
import { ISocketState } from './models';

const widgetName = 'Socket';

// actions
export const changeSocketState = createAction(
  `${appName}/${widgetName}/CHANGE_SOCKET_STATE`,
)<ISocketState>();

export const startSocketConnection = createAction(
  `${appName}/${widgetName}/START_SOCKET_CONNECTION`,
)<undefined>();

export const endSocketConnection = createAction(
  `${appName}/${widgetName}/END_SOCKET_CONNECTION`,
)<undefined>();
