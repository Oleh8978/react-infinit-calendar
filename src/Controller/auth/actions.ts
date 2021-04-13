import { createAction, createAsyncAction } from 'typesafe-actions';

//Configs
import { widgetName } from './index';
import { appName } from "Config";

//Interfaces
import { IAuthException, IAuthState, ISetAuthenticatedStatus, ISignedData } from './model';


// ** Action
export const setAuthenticatedStatus = createAction(
  `${appName}/${widgetName}/SET_AUTHENTICATED_STATUS`
)<ISetAuthenticatedStatus>();

export const signIn = createAsyncAction(
  `${appName}/${widgetName}/SIGN_IN_REQUEST`,
  `${appName}/${widgetName}/SIGN_IN_SUCCESS`,
  `${appName}/${widgetName}/SIGN_IN_FILED`
)<ISignedData, IAuthState, IAuthException>();


export const loginByToken = createAsyncAction(
  `${appName}/${widgetName}/LOGIN_BY_TOKEN_REQUEST`,
  `${appName}/${widgetName}/LOGIN_BY_TOKEN_SUCCESS`,
  `${appName}/${widgetName}/LOGIN_BY_TOKEN_FILED`
)<string, IAuthState, IAuthException>();

// Action for user sign out
// ** Action
export const signOut = createAsyncAction(
  `${appName}/${widgetName}/SIGN_OUT_REQUEST`,
  `${appName}/${widgetName}/SIGN_OUT_SUCCESS`,
  `${appName}/${widgetName}/SIGN_OUT_FILED`
)<undefined, undefined, any>();