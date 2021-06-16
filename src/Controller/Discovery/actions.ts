import { createAsyncAction } from 'typesafe-actions';

import { appName } from '../../Config/index';

//Interfaces
import { IException } from './model';

import {
  DiscoveryGetListResponse,
  DiscoveryGetListRequest,
} from '@ternala/frasier-types';

// const for ath actions
export const widgetName = 'discovery';

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
    isAll: boolean;
  },
  IException
>();
