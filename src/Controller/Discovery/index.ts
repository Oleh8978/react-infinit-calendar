import { ActionType, createReducer } from 'typesafe-actions';
import { all } from 'redux-saga/effects';

//Sagas
import {} from './sagas/discovery';

// actions
import * as actions from './actions';

// interfaces
import { IDiscoveryState } from './model';

export type DiscoveryActionType = ActionType<typeof actions>;

export const authSaga = function* () {
  yield all([]);
};

// initial state
const initialState: IDiscoveryState = {
  discoveryList: {},
  ILoadersState: {
    loaders: [],
    errors: [],
  },
};

export const authReducer = createReducer<IDiscoveryState, DiscoveryActionType>(
  initialState,
).handleAction(
  [actions.getDiscovery.success],
  (state: IDiscoveryState, { payload }): IDiscoveryState => ({
    ...state,
    // ...payload,
    // authData: {
    //   accessToken: payload.authData.accessToken,
    //   refreshToken: payload.authData.refreshToken,
    // },
    // isAllfiealdsFilledOut: false,
    // isAuthenticated: true,
    // error: undefined,
  }),
);
