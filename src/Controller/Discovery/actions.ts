import { createAsyncAction } from 'typesafe-actions';

import { appName } from '../../Config/index';

//Interfaces
import { IException, ISetLoadingAction } from './model';

import {
  DiscoveryGetListResponse,
  DiscoveryGetListRequest,
} from '@ternala/frasier-types';

// const for ath actions
export const widgetName = 'discovery';

// loading action
export const setLoadingAction = createAction(
  `${appName}/${widgetName}/SET_ISLOADING_STATUS`,
)<ISetLoadingAction>();

// ** Action
export const getDiscoveryList = createAsyncAction(
  `${appName}/${widgetName}/GET_DISCOVERY_REQUEST`,
  `${appName}/${widgetName}/GET_DISCOVERY_SUCCESS`,
  `${appName}/${widgetName}/GET_DISCOVERY_FAILED`,
)<
  DiscoveryGetListRequest & { callback?: any },
  {
    response: DiscoveryGetListResponse;
    searchParams: DiscoveryGetListRequest;
  },
  IException
>();
