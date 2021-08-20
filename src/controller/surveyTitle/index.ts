import { all } from 'redux-saga/effects';
import { createReducer, ActionType } from 'typesafe-actions';
import { omit } from 'lodash';

// Actions
import * as actions from './actions';

// Interfaces
import { QuestionDTO } from '@ternala/frasier-types';
import { ISurveyTitleState } from './models';

// utils
import { concatWithUnique } from '@app/utils/concatWithUnique';

export type SurveysActionType = ActionType<typeof actions>;

/* Reducer */
const initialState: ISurveyTitleState = {
  surveyInfo: {
    title: undefined,
  },
  loader: {
    status: true,
  },
};

export const surveyTitleReducer = createReducer<
  ISurveyTitleState,
  SurveysActionType
>(initialState)
  .handleAction(actions.setLoadingAction, (store, { payload }) => ({
    ...store,
    loaderState: {
      status: payload.status,
    },
  }))
  .handleAction(
    [actions.getSurveyTitle.success],
    (state: ISurveyTitleState, { payload }): ISurveyTitleState => ({
      surveyInfo: {
        title: payload,
      },
      loader: {
        status: false,
      },
    }),
  );
