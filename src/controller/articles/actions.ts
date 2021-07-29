import { appName } from '@app/config';
import { createAsyncAction, createAction } from 'typesafe-actions';

import {
  ArticleGetListRequest,
  ArticleGetListResponse,
} from '@ternala/frasier-types';

import { ISetLoadingAction } from './models';

/* Actions */
export const widgetName = 'ARTICLE_LIST';

// Action Loader
export const setLoadingAction = createAction(
  `${appName}/${widgetName}/SET_ARTICLE_CATEGORIES_ISLOADING_STATUS`,
)<ISetLoadingAction>();

// ** Action
export const getArticleListByModuleCqategory = createAsyncAction(
  `${appName}/${widgetName}/GET_ARTICLE_REQUEST`,
  `${appName}/${widgetName}/GET_ARTICLE_SUCCESS`,
  `${appName}/${widgetName}/GET_ARTICLE_FILED`,
)<
  ArticleGetListRequest & { callback?: any },
  {
    response: ArticleGetListResponse;
    searchParams: ArticleGetListRequest;
    isAll: boolean;
  },
  any
>();
