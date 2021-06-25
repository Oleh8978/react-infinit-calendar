import { createAction, createAsyncAction } from 'typesafe-actions';

import { appName } from '@app/config';

//Interfaces
import { IException, ISetLoadingAction, IUser } from './models';
import {
  UserDataCreateRequest,
  UserDataUpdateRequest,
  UserDataDeleteRequest,
  UserDataCreateResponse,
  UserDataGetResponse,
  UserDataUpdateResponse,
  UserDataDeleteResponse,
} from '@ternala/frasier-types';

// const for ath actions
export const widgetName = 'user';

// loading action
export const setLoadingAction = createAction(
  `${appName}/${widgetName}/SET-ACCOUNT_LOADINACTION`,
)<ISetLoadingAction>();

export const getUserAction = createAsyncAction(
  `${appName}/${widgetName}/GET_USER_REQUEST`,
  `${appName}/${widgetName}/GET_USER_SUCCESS`,
  `${appName}/${widgetName}/GET_USER_FAILED`,
)<any, IUser, IException>();

// export const updateUserAction = createAsyncAction(
//   `${appName}/${widgetName}/UPDATE_USER_REQUEST`,
//   `${appName}/${widgetName}/UPDATE_USER_SUCCESS`,
//   `${appName}/${widgetName}/UPDATE_USER_FILED`,
// )<UserUpdateRequest, UserUpdateResponse, IException>();

// export const deleteUserAction = createAsyncAction(
//   `${appName}/${widgetName}/DELETE_USER_REQUEST`,
//   `${appName}/${widgetName}/DELETE_USER_SUCCESS`,
//   `${appName}/${widgetName}/DELETE_USER_FILED`,
// )<UserDeleteRequest, UserDeleteResponse & { id?: number }, IException>();
