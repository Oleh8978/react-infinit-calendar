import { createAction, createAsyncAction } from 'typesafe-actions';

// models
import { StaticPageDTO } from '@ternala/frasier-types';
import { ISetLoadingAction, IStatticPagesData } from './models';

// app name
import { appName } from '@app/config/index';

// const for ath actions
export const widgetName = 'STATIC_PAGE';

export const setLoadingAction = createAction(
  `${appName}/${widgetName}/SET_ISLOADING_STATUS`,
)<ISetLoadingAction>();

export const getPageBySlug = createAsyncAction(
  `${appName}/${widgetName}/GET_STATIC_PAGE_REQUEST`,
  `${appName}/${widgetName}/GET_STATIC_PAGE_SUCCESS`,
  `${appName}/${widgetName}/GET_STATIC_PAGE_FAILED`,
)<string, StaticPageDTO, ISetLoadingAction>();

export const staticPagesList = createAsyncAction(
  `${appName}/${widgetName}/GET_STATIC_PAGES_REQUEST`,
  `${appName}/${widgetName}/GET_STATIC_PAGES_SUCCESS`,
  `${appName}/${widgetName}/GET_STATIC_PAGES_FAILED`,
)<any, IStatticPagesData, ISetLoadingAction>();
