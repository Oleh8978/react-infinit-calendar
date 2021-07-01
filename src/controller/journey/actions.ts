import { createAction, createAsyncAction } from 'typesafe-actions';
// interfaces

import { appName } from '@app/config';
import { IException } from './models';
import {
  JourneyGetResponse,
  JourneyUserConnectCreateRequest,
  JourneyUserConnectCreateResponse,
  JourneyUserConnectDeleteRequest, JourneyUserConnectDeleteResponse,
} from '@ternala/frasier-types';

// const for ath actions
export const widgetName = 'journey';

//Actions
export const getJourneyDataAction = createAsyncAction(
  `${appName}/${widgetName}/GET_JOURNEY_REQUEST`,
  `${appName}/${widgetName}/GET_JOURNEY_SUCCESS`,
  `${appName}/${widgetName}/GET_JOURNEY_FAILED`,
)<number, JourneyGetResponse, IException>();


export const setJourneyConnectAction = createAsyncAction(
  `${appName}/${widgetName}/SET_JOURNEY_CONNECT_REQUEST`,
  `${appName}/${widgetName}/SET_JOURNEY_CONNECT_SUCCESS`,
  `${appName}/${widgetName}/SET_JOURNEY_CONNECT_FAILED`,
)<
  JourneyUserConnectCreateRequest,
  {
    response: JourneyUserConnectCreateResponse;
    additionalFields: JourneyUserConnectCreateRequest;
  },
  IException
  >();

export const deleteJourneyConnectAction = createAsyncAction(
  `${appName}/${widgetName}/DELETE_JOURNEY_CONNECT_REQUEST`,
  `${appName}/${widgetName}/DELETE_JOURNEY_CONNECT_SUCCESS`,
  `${appName}/${widgetName}/DELETE_JOURNEY_CONNECT_FAILED`,
)<
  JourneyUserConnectDeleteRequest,
  {
    response: JourneyUserConnectDeleteResponse;
    additionalFields: JourneyUserConnectDeleteRequest;
  },
  IException
  >();

export const LoaderAction = createAction(`${widgetName}/SET_LOADER_ACTION`)<{
  code?: number | undefined | string;
  message?: string;
  isLoading: boolean;
  error?: boolean;
}>();
