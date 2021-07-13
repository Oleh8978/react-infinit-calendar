import { createAction, createAsyncAction } from 'typesafe-actions';

import { appName } from '@app/config/index';

// interfaces
import { TipGetListResponse } from '@ternala/frasier-types';
import {
  ISetLoadingAction,
  ITipsSearchParams,
  IPostReadedTips,
  IGetListRequest,
} from './models';
import { GetListParameters } from '@ternala/frasier-types/lib/modules/query.dto';

// const for ath actions
export const widgetName = 'TIPS';

// loading action
export const setLoadingAction = createAction(
  `${appName}/${widgetName}/SET_ISLOADING_STATUS`,
)<ISetLoadingAction>();

// ** Action
export const getTipsListRequest = createAsyncAction(
  `${appName}/${widgetName}/GET_TIPS_REQUEST`,
  `${appName}/${widgetName}/GET_TIPS_SUCCESS`,
  `${appName}/${widgetName}/GET_TIPS_FAILED`,
)<
  IGetListRequest,
  {
    response: TipGetListResponse;
    searchParams: GetListParameters;
  },
  ISetLoadingAction
>();

export const setReadedItems = createAsyncAction(
  `${appName}/${widgetName}/POST_READED_TIPS_REQUEST`,
  `${appName}/${widgetName}/POST_READED_SUCCESS`,
  `${appName}/${widgetName}/POST_READED_FAILED`,
)<IPostReadedTips, any, ISetLoadingAction>();
