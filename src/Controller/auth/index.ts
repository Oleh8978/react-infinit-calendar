import { ActionType, createReducer } from 'typesafe-actions';
import { all } from 'redux-saga/effects';

import { IStore } from '../model';
import { IAuthState } from './model';
import * as actions from './actions';

export type AuthActionType = ActionType<typeof actions>;
export const widgetName = 'auth';

export const authSaga = function* () {
  yield all([]);
};

const initialState: IAuthState = {
  state: {
    loaders: [],
    errors: [],
  },
};

export const authReducer = createReducer<IAuthState, AuthActionType>(
  initialState,
);

export const getAuthStatus = (state: IStore): boolean | undefined =>
  state.authState.isAuthenticated;
