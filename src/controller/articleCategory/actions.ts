import { appName } from '@app/config';
import { createAsyncAction, createAction } from 'typesafe-actions';

import {
  ArticleCreateResponse,
  ArticleGetResponse,
  ArticleUpdateResponse,
  ArticleDeleteResponse,
  ArticleGetListResponse,
  ArticleCreateRequest,
  ArticleUpdateRequest,
  ArticleDeleteRequest,
  ArticleGetListFilters,
  ArticleGetListRequest,
} from '@ternala/frasier-types';

import { IException, ISetLoadingAction } from './models';

/* Actions */
export const widgetName = 'article';

// Action Loader
export const setLoadingAction = createAction(
  `${appName}/${widgetName}/SET_ARTICLE_CATEGORIES_ISLOADING_STATUS`,
)<ISetLoadingAction>();

// ** Action
export const getArticlesCategoriesAction = createAsyncAction(
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
  IException
>();

/// these actions below are nto working ///

export const updateArticleAction = createAsyncAction(
  `${appName}/${widgetName}/UPDATE_ARTICLE_REQUEST`,
  `${appName}/${widgetName}/UPDATE_ARTICLE_SUCCESS`,
  `${appName}/${widgetName}/UPDATE_ARTICLE_FILED`,
)<ArticleUpdateRequest, ArticleUpdateResponse, IException>();

export const deleteArticleAction = createAsyncAction(
  `${appName}/${widgetName}/DELETE_ARTICLE_REQUEST`,
  `${appName}/${widgetName}/DELETE_ARTICLE_SUCCESS`,
  `${appName}/${widgetName}/DELETE_ARTICLE_FILED`,
)<ArticleDeleteRequest, ArticleDeleteResponse & { id?: number }, IException>();

//   export const getEnterpriseTreeAction = createAsyncAction(
//     `${appName}/${widgetName}/GET_ENTERPRISE_TREE_REQUEST`,
//     `${appName}/${widgetName}/GET_ENTERPRISE_TREE_SUCCESS`,
//     `${appName}/${widgetName}/GET_ENTERPRISE_TREE_FILED`
//   )<EnterpriseGetRequest, EnterpriseFullExpandedDTO, IException>();
