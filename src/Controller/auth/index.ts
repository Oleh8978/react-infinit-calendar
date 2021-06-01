import { ActionType, createReducer } from 'typesafe-actions';
import { all } from 'redux-saga/effects';
// actions
import * as actions from './actions';
// interfaces
import { IStore } from '../model';
import { IAuthState } from './model';

//Sagas
import { authActionSaga, checkAccessTokenExpired } from './sagas/auth';

import { getCredentials } from '../../utils/deviceCredentials';

export type AuthActionType = ActionType<typeof actions>;
export const widgetName = 'auth';

export const authSaga = function* () {
  yield all([authActionSaga()]);
};

const initialState: IAuthState = {
  isAuthenticated: true,
  state: {
    loaders: [],
    errors: [],
  },
};

export const authReducer = createReducer<IAuthState, AuthActionType>(
  initialState,
)
  .handleAction(actions.setAuthStateAction, (store, { payload }) => ({
    ...store,
    state: payload,
  }))
  .handleAction(
    actions.setAuthenticatedStatus,
    (state: IAuthState, { payload }): IAuthState => ({
      ...state,
      isAuthenticated: payload.status,
    }),
  )
  .handleAction(
    [actions.signIn.success],
    (state: IAuthState, { payload }): IAuthState => ({
      ...state,
      ...payload,
      authData: {
        accessToken: payload.authData.accessToken,
        refreshToken: payload.authData.refreshToken,
      },
      isAuthenticated: true,
      error: undefined,
    }),
  )
  .handleAction(
    [actions.refreshTokenAction.success],
    (state: IAuthState, { payload }): IAuthState => ({
      ...state,
      authData: payload,
      isAuthenticated: true,
      error: undefined,
    }),
  )
  .handleAction(
    [actions.signIn.failure],
    (state: IAuthState, { payload }): IAuthState => ({
      ...state,
      error: payload,
      isAuthenticated: false,
    }),
  )
  .handleAction(
    [actions.logOut.success],
    (state: IAuthState): IAuthState => ({
      ...state,
      isAuthenticated: false,
      error: undefined,
    }),
  );

/* Selectors */

export const getAuthState = (state: IStore) => state.authState.state;

export const getAuthStatus = (state: IStore): boolean | undefined =>
  state.authState.isAuthenticated;

export const getAccessToken = async (store: IStore) => {
  if (store.authState.token) {
    const { accessToken, refreshToken } = store.authState.authData;
    const deviceCredentials = await getCredentials();
    const res = await checkAccessTokenExpired(
      { accessToken, refreshToken, deviceCredentials },
      store,
    );
    if (res) {
      return res.accessToken;
    }
  }
};
export const getRefreshToken = (state: IStore) =>
  state.authState.authData?.refreshToken;

export const getDeviceCreds = (state: IStore) =>
  state.authState.deviceCredentials;
