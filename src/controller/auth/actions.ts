import { createAction, createAsyncAction } from 'typesafe-actions';

import { appName } from '@app/config';

//Interfaces
import {
  IAuthException,
  IAuthState,
  ISetAuthenticatedStatus,
  ISignInInterface,
  IAuthData,
  IRefreshToken,
  ILinkObjectRemove,
  ILinkObject,
  IUser,
  INotificationSetter,
} from './model';

// const for ath actions
export const widgetName = 'AUTH';

// ** Action
export const setAuthenticatedStatus = createAction(
  `${appName}/${widgetName}/SET_AUTHENTICATED_STATUS`,
)<ISetAuthenticatedStatus>();

export const setIsneedSecondStep = createAction(
  `${appName}/${widgetName}/SET_ISNEEDSECONDSTEP_STATUS`,
)<IUser>();

export const loginByTokenAction = createAction(
  `${appName}/${widgetName}/LOGIN_TOKEN_REQUEST`,
)<IAuthData>();

export const deleteProfile = createAsyncAction(
  `${appName}/${widgetName}/DELETE_ACOUNT_REQUEST`,
  `${appName}/${widgetName}/DELETE_ACOUNT_SUCCESS`,
  `${appName}/${widgetName}/DELETE_ACTOUNT_FAILED`,
)<any, any, any>();

export const refreshTokenAction = createAsyncAction(
  `${appName}/${widgetName}/REFRESH_TOKEN_REQUEST`,
  `${appName}/${widgetName}/REFRESH_TOKEN_SUCCESS`,
  `${appName}/${widgetName}/REFRESH_TOKEN_FAILED`,
)<IRefreshToken, IAuthData, IAuthException>();

export const signIn = createAsyncAction(
  `${appName}/${widgetName}/SIGN_IN_REQUEST`,
  `${appName}/${widgetName}/SIGN_IN_SUCCESS`,
  `${appName}/${widgetName}/SIGN_IN_FAILED`,
)<ISignInInterface, IAuthState, IAuthException>();

// Action for user sign out
// ** Action
export const logOut = createAsyncAction(
  `${appName}/${widgetName}/SIGN_OUT_REQUEST`,
  `${appName}/${widgetName}/SIGN_OUT_SUCCESS`,
  `${appName}/${widgetName}/SIGN_OUT_FAILED`,
)<any, string, any>();

export const addLinkedSocialNetwork = createAsyncAction(
  `${appName}/${widgetName}/ADD_LINK_REQUEST`,
  `${appName}/${widgetName}/ADD_LINK_SUCCESS`,
  `${appName}/${widgetName}/ADD_LINK_FAILED`,
)<ILinkObject, string[], any>();

export const removeLinkedSocialNetwork = createAsyncAction(
  `${appName}/${widgetName}/REMOVE_LINK_REQUEST`,
  `${appName}/${widgetName}/REMOVE_LINK_SUCCESS`,
  `${appName}/${widgetName}/REMOVE_LINK_FAILED`,
)<ILinkObjectRemove, string[], any>();

export const setAuthStateAction = createAction(`${widgetName}/SET_AUTH_STATE`)<{
  code?: number | undefined;
  message?: string;
  isLoading: boolean;
  error?: boolean;
}>();

export const updateUserData = createAction(
  `${appName}/${widgetName}/UPDATE_USER_DATA`,
)<IAuthState>();
