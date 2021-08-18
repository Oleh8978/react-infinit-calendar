import { createAction, createAsyncAction } from 'typesafe-actions';

import { appName } from '@app/config/index';

// interfaces
import { QuestionGetListResponse } from '@ternala/frasier-types';
import {
  ISetLoadingAction,
  IGetListRequest,
  ISendSurveyResult,
} from './models';
import { GetListParameters } from '@ternala/frasier-types/lib/modules/query.dto';

// const for ath actions
export const widgetName = 'SURVEY';

// loading action
export const setLoadingAction = createAction(
  `${appName}/${widgetName}/SET_ISLOADING_STATUS`,
)<ISetLoadingAction>();

// ** Action
export const getSurveysRequest = createAsyncAction(
  `${appName}/${widgetName}/GET_SURVEYS_REQUEST`,
  `${appName}/${widgetName}/GET_SURVEYS_SUCCESS`,
  `${appName}/${widgetName}/GET_SURVEYS_FAILED`,
)<
  IGetListRequest,
  {
    response: QuestionGetListResponse;
    searchParams: GetListParameters;
  },
  ISetLoadingAction
>();

export const submitAnswerRequest = createAsyncAction(
  `${appName}/${widgetName}/CREATE_SURVEY_ANSWER_REQUEST`,
  `${appName}/${widgetName}/CREATE_SURVEY_ANSWER_SUCCESS`,
  `${appName}/${widgetName}/CREATE_SURVEY_ANSWER_FAILED`,
)<ISendSurveyResult, any, any>();
