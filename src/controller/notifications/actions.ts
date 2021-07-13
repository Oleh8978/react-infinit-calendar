import { createAction, createAsyncAction } from 'typesafe-actions';

import { appName } from '@app/config';

// interfaces
import { INotificationRequest, IloaderState } from './models';

// widjet name
export const widgetName = 'NOTIFICATIONS';

// loading action
export const setLoadingAction = createAction(
  `${appName}/${widgetName}/SET_LOADING_STATUS`,
)<IloaderState>();

export const patchNotificationAction = createAsyncAction(
  `${appName}/${widgetName}/PATCH_NOTIFICATION_REQUEST`,
  `${appName}/${widgetName}/PATCH_NOTIFICATION_SUCCESS`,
  `${appName}/${widgetName}/PATCH_NOTIFICATION_FAILURE`,
)<INotificationRequest, INotificationRequest, any[]>();
