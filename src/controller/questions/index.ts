import { all } from 'redux-saga/effects';
import { createReducer, ActionType } from 'typesafe-actions';
import { omit } from 'lodash';

// Actions
import * as actions from './actions';

// Interfaces
import { QuestionDTO } from '@ternala/frasier-types';
import { ISurveyState } from './models';

// utils
import { concatWithUnique } from '@app/utils/concatWithUnique';

export type SurveysActionType = ActionType<typeof actions>;

/* Reducer */
const initialState: ISurveyState = {
  surveys: {
    items: [],
    counts: undefined,
  },
  storedSearchParams: {
    limit: 0,
    offset: 0,
  },
  loaderState: {
    status: false,
  },
};

export const surveyListReducer = createReducer<ISurveyState, SurveysActionType>(
  initialState,
)
  .handleAction(actions.setLoadingAction, (store, { payload }) => ({
    ...store,
    loaderState: {
      status: payload.status,
    },
  }))
  .handleAction(
    [actions.getSurveysRequest.success],
    (state: ISurveyState, { payload }): ISurveyState => {
      const storedSearchParams = { ...state.storedSearchParams };
      const { searchParams }: any = payload;

      let surveyList;
      if (
        JSON.stringify(omit(storedSearchParams, ['limit', 'offset'])) ===
        JSON.stringify(omit(searchParams, ['limit', 'offset']))
      ) {
        const payloadResponseArray = [];

        payload.response.items.map((item) => {
          if (
            state.surveys.items.find((elem) => elem.id === item.id) ===
            undefined
          ) {
            payloadResponseArray.push({ ...item });
          }
        });

        surveyList = concatWithUnique<QuestionDTO>(
          state.surveys.items || [],
          payloadResponseArray,
        );
      } else {
        surveyList = concatWithUnique<QuestionDTO>(
          [],
          payload.response.items.map((item) => item),
        );
      }

      return {
        ...state,
        storedSearchParams: searchParams,
        surveys: {
          counts: payload.response.counts,
          items: surveyList,
        },
        loaderState: {
          status: false,
        },
      };
    },
  )
  .handleAction(actions.submitAnswerRequest.success, (store) => ({
    ...store,
    loaderState: {
      status: false,
    },
  }));
