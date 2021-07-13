import { all } from 'redux-saga/effects';
import { createReducer, ActionType } from 'typesafe-actions';

// Actions
import * as actions from './actions';

//Sagas
import { submitAnswerSaga } from './sagas/faq';

// interfaces
import { IfaqState } from './models';

export type FaqActionsType = ActionType<typeof actions>;

export const FaqSagas = function* () {
  yield all([submitAnswerSaga()]);
};

/* Reducer */
const initialState: IfaqState = {
  data: {
    categoryID: '',
    description: '',
  },
  loader: {
    isLoading: false,
    isError: false,
    error: '',
  },
};

export const faqReducer = createReducer<IfaqState, FaqActionsType>(
  initialState,
)
  .handleAction(actions.setLoadingAction, (store, { payload }) => ({
    ...store,
    loader: { ...payload },
  }))
  .handleAction(
    [actions.submitAnswer.success],
    (state: IfaqState, { payload }): IfaqState => ({
      data: {
        categoryID: payload.categoryID,
        description: payload.description,
      },
      loader: {
        isLoading: false,
        isError: false,
        error: '',
      },
    }),
  )
  .handleAction(
    [actions.submitAnswer.failure],
    (state: IfaqState): IfaqState => ({
      ...state,
      data: {
        categoryID: '',
        description: '',
      },
      loader: {
        ...state.loader,
      },
    }),
  );
