import { createAction, createAsyncAction } from 'typesafe-actions';
// interfaces
import { IException, IUserDataExtended, IUpdateState } from './models';

import { appName } from 'Config';

// const for ath actions
export const widgetName = 'updateUser';

export const updateUserDataAction = createAsyncAction(
  `${appName}/${widgetName}/REFRESH_TOKEN_REQUEST`,
  `${appName}/${widgetName}/REFRESH_TOKEN_SUCCESS`,
  `${appName}/${widgetName}/REFRESH_TOKEN_FAILED`,
)<IUserDataExtended, IUserDataExtended, IException>();

export const LoaderAction = createAction(`${widgetName}/SET_LOADER_ACTION`)<{
  code?: number | undefined | string;
  message?: string;
  isLoading: boolean;
  error?: boolean;
}>();
