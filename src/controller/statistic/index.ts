import { ActionType, createReducer } from 'typesafe-actions';
import { all } from 'redux-saga/effects';
// actions
import * as actions from './actions';
// interfaces
import { IStatisticsState, IstatisticToday } from './models';

//Sagas
import { todayStatisticsSaga } from './sagas/statisticSaga';

export const todaySatisticSaga = function* () {
  yield all([todayStatisticsSaga()]);
};

export type AuthActionType = ActionType<typeof actions>;

const initialState: IStatisticsState = {
  statisticToday: {
    today: undefined,
  },
  errorState: {
    error: '',
    name: '',
    code: '',
  },
  loaderState: {
    status: false,
  }
};

export const statisticReducer = createReducer<IStatisticsState, AuthActionType>(
  initialState,
)
  .handleAction(actions.setLoaderState, (store, { payload }) => ({
    ...store,
    loaderState: {
      status: payload.status,
    },
  }))
  .handleAction(
    [actions.getStatisticToday.success],
    (state: IStatisticsState, { payload }): IStatisticsState => ({
      ...state,
      statisticToday: { ...payload },
      errorState: {
        error: '',
        name: '',
        code: '',
      },
    }),
  )
  .handleAction(
    [actions.getStatisticToday.failure],
    (state: IStatisticsState, { payload }): IStatisticsState => ({
      ...state,
      errorState: {
        error: payload.error,
        name: payload.name,
        code: payload.code,
      },
    }),
  )
