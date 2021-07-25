import { ActionType, createReducer } from 'typesafe-actions';
import { all } from 'redux-saga/effects';
// actions
import * as actions from './actions';
// interfaces
import { IStatisticsListState } from './models';

export type AuthActionType = ActionType<typeof actions>;

const initialState: IStatisticsListState = {
  journeyObject: {
    journeys: undefined,
  },
  errorState: {
    error: '',
    name: '',
    code: '',
  },
  loaderState: {
    status: false,
  },
};

export const statisticListReducer = createReducer<
  IStatisticsListState,
  AuthActionType
>(initialState)
  .handleAction(actions.setLoaderListState, (store, { payload }) => ({
    ...store,
    loaderState: {
      status: payload.status,
    },
  }))
  .handleAction(
    [actions.getStatisticList.success],
    (state: IStatisticsListState, { payload }): IStatisticsListState => ({
      ...state,
      journeyObject: {
        journeys: payload,
      },
      errorState: {
        error: '',
        name: '',
        code: '',
      },
    }),
  )
  .handleAction(
    [actions.getStatisticList.failure],
    (state: IStatisticsListState, { payload }): IStatisticsListState => ({
      ...state,
      errorState: {
        error: payload.error,
        name: payload.name,
        code: payload.code,
      },
    }),
  );
