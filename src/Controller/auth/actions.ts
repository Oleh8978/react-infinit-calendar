import { createAction, createAsyncAction } from 'typesafe-actions';

//Configs
import { widgetName } from './index';
import { appName } from 'Config';

//Interfaces
import {
  IAuthException,
  IAuthState,
  ISetAuthenticatedStatus,
  ISignedData,
  ISignInData,
  IAuthData,
  IRefreshToken,
  ISignInByToken,
} from './model';

// ** Action
export const setAuthenticatedStatus = createAction(
  `${appName}/${widgetName}/SET_AUTHENTICATED_STATUS`,
)<ISetAuthenticatedStatus>();

export const loginByTokenAction = createAction(
  `${appName}/${widgetName}/LOGIN_TOKEN_REQUEST`,
)<ISignInByToken>();

export const refreshTokenAction = createAsyncAction(
  `${appName}/${widgetName}/REFRESH_TOKEN_REQUEST`,
  `${appName}/${widgetName}/REFRESH_TOKEN_SUCCESS`,
  `${appName}/${widgetName}/REFRESH_TOKEN_FAILED`,
)<IRefreshToken, IAuthData, IAuthException>();

export const signIn = createAsyncAction(
  `${appName}/${widgetName}/SIGN_IN_REQUEST`,
  `${appName}/${widgetName}/SIGN_IN_SUCCESS`,
  `${appName}/${widgetName}/SIGN_IN_FAILED`,
)<{ receivedToken: string; signIntype: string }, IAuthState, IAuthException>();

export const loginByToken = createAsyncAction(
  `${appName}/${widgetName}/LOGIN_BY_TOKEN_REQUEST`,
  `${appName}/${widgetName}/LOGIN_BY_TOKEN_SUCCESS`,
  `${appName}/${widgetName}/LOGIN_BY_TOKEN_FAILED`,
)<string, IAuthState, IAuthException>();

// Action for user sign out
// ** Action
export const logOut = createAsyncAction(
  `${appName}/${widgetName}/SIGN_OUT_REQUEST`,
  `${appName}/${widgetName}/SIGN_OUT_SUCCESS`,
  `${appName}/${widgetName}/SIGN_OUT_FAILED`,
)<undefined, undefined, any>();

export const setAuthStateAction = createAction(`${widgetName}/SET_AUTH_STATE`)<{
  code?: number | undefined;
  message?: string;
  isLoading?: boolean;
  error?: boolean;
  loaders: any[];
  errors: any[];
}>();
