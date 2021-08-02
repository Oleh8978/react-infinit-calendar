import { createAction, createAsyncAction } from 'typesafe-actions';
// interfaces
import {
  IException,
  IUserDataExtended,
  IIsSecondStepPassed,
  ILoaderState,
} from './models';

import { appName } from '@app/config';

// const for ath actions
export const widgetName = 'updateUser';

//Actions
export const setIsSecondStepPassed = createAction(
  `${appName}/${widgetName}/SET_AUTHENTICATED_STATUS`,
)<IIsSecondStepPassed>();

export const LoaderAction = createAction(
  `${appName}/${widgetName}/SET_SECONDSTEPLOADER_STATUS`,
)<ILoaderState>();

export const updateUserDataAction = createAsyncAction(
  `${appName}/${widgetName}/REFRESH_TOKEN_REQUEST`,
  `${appName}/${widgetName}/REFRESH_TOKEN_SUCCESS`,
  `${appName}/${widgetName}/REFRESH_TOKEN_FAILED`,
)<IUserDataExtended, any, IException>();

// export const LoaderAction = createAction(`${widgetName}/SET_LOADER_ACTION`)<{
//   code?: number | undefined | string;
//   message?: string;
//   isLoading: boolean;
//   error?: boolean;
// }>();
