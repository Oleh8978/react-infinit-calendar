import { ActionType, createReducer } from 'typesafe-actions';
import { all } from 'redux-saga/effects';
// actions
import * as actions from '../auth/actions';

// config
import { defaultUserStartTime } from '@app/config/constants';

// interfaces
import { IStore } from '../model';
import { IAuthState } from '../auth/model';

//Sagas
import { authActionSaga, checkAccessTokenExpired } from './sagas/auth';

// functionality
import { getSavedAccess } from '@app/utils/manageAccess';
import { getCredentials } from '@app/utils/deviceCredentials';

export type AuthActionType = ActionType<typeof actions>;

export const authSaga = function* () {
  yield all([authActionSaga()]);
};

const initialState: IAuthState = {
  isAuthenticated: false,
  accessToken: '',
  refreshToken: '',
  user: {
    createdAt: '',
    id: 0,
    isCanSendEmail: false,
    isCanSendPush: false,
    isNeedSecondStep: true,
    userData: {
      city: '',
      deletedAt: '',
      email: '',
      firstName: '',
      id: 0,
      image: '',
      lastName: '',
      phone: '',
      startTime: defaultUserStartTime,
      state: '',
      street: '',
      timezone: '',
      zipCode: '',
    },
    userAuthorizations: [],
  },
  state: {
    code: undefined,
    isLoading: false,
    error: false,
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
    actions.setIsneedSecondStep,
    (state: IAuthState, { payload }): IAuthState => ({
      ...state,
      user: {
        ...state.user,
        isNeedSecondStep: payload.isNeedSecondStep,
        userData: {
          ...state.user.userData,
        },
      },
    }),
  )
  .handleAction(
    [actions.signIn.success],
    (state: IAuthState, { payload }): IAuthState => ({
      ...state,
      ...payload,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      isAuthenticated: true,
      error: undefined,
      user: {
        ...payload.user,
        userData: {
          ...payload.user.userData,
        },
        userAuthorizations: payload.user.userAuthorizations,
      },
    }),
  )
  .handleAction(
    [actions.refreshTokenAction.success],
    (state: IAuthState, { payload }): IAuthState => ({
      ...state,
      refreshToken: payload.refreshToken,
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
      isAuthenticated: false,
      accessToken: '',
      refreshToken: '',
      user: {
        createdAt: '',
        id: 0,
        isCanSendEmail: false,
        isCanSendPush: false,
        isNeedSecondStep: true,
        userData: {
          city: '',
          deletedAt: '',
          email: '',
          firstName: '',
          id: 0,
          image: '',
          lastName: '',
          phone: '',
          startTime: defaultUserStartTime,
          state: '',
          street: '',
          timezone: '',
          zipCode: '',
        },
        userAuthorizations: [],
      },
      state: {
        code: undefined,
        isLoading: false,
        error: false,
      },
    }),
  )
  // .handleAction(
  //   [actions.removeLinkedSocialNetwork.success],
  //   (state: IAuthState, { payload }): IAuthState => ({
  //     ...state,
  //     isAuthenticated: true,
  //     error: undefined,
  //     user: {
  //       ...state.user,
  //       userData: {
  //         ...state.user.userData,
  //       },
  //       userAuthorizations: payload,
  //     },
  //     state: {
  //       code: undefined,
  //       isLoading: false,
  //       error: false,
  //     },
  //   }),
  // )
  .handleAction(
    [actions.addLinkedSocialNetwork.success],
    (state: IAuthState, { payload }): IAuthState => ({
      ...state,
      isAuthenticated: true,
      error: undefined,
      user: {
        ...state.user,
        userData: {
          ...state.user.userData,
        },
        userAuthorizations: payload,

      },
      state: {
        code: undefined,
        isLoading: false,
        error: false,
      },
    }),
  )
  .handleAction(
    [actions.deleteProfile.success],
    (state: IAuthState, { payload }): IAuthState => ({
      ...state,
      ...payload,
      accessToken: '',
      refreshToken: '',
      isAuthenticated: false,
      error: undefined,
      user: {
        createdAt: '',
        id: 0,
        isCanSendEmail: false,
        isCanSendPush: false,
        isNeedSecondStep: false,
        userData: {
          city: '',
          deletedAt: '',
          email: '',
          firstName: '',
          id: 0,
          image: '',
          lastName: '',
          phone: '',
          startTime: defaultUserStartTime,
          state: '',
          street: '',
          timezone: '',
          zipCode: '',
        },
        userAuthorizations: [],
      },
      state: {
        code: undefined,
        isLoading: false,
        error: false,
      },
    }),
  )
  
/* Selectors */

export const getAuthState = (state: IStore) => state.authState.state;

export const getAvailableNetworks = (state: IStore) => state.authState.user.userAuthorizations;

export const getAuthStatus = (state: IStore): boolean | undefined =>
  state.authState.isAuthenticated;

export const getAccessToken = async (store: IStore) => {
  if (store.authState.accessToken.length > 0) {
    const accessToken = store.authState.accessToken;
    const refreshToken = store.authState.refreshToken;
    const deviceCredentials = await getCredentials();
    const res = await checkAccessTokenExpired(
      { accessToken, refreshToken, deviceCredentials },
      store,
    );
    if (res) {
      return res.accessToken;
    }
  } else {
    const accessToken = getSavedAccess().accessToken;
    const refreshToken = getSavedAccess().refreshToken;
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

export const getRefreshToken = (state: IStore) => {
  if (state.authState.refreshToken.length > 0) {
    return state.authState.refreshToken;
  } else {
    return getSavedAccess().refreshToken;
  }
};
// export const getRefreshToken = (state: IStore) => state.authState.refreshToken;


export const deviceCredentials = async () => {
  await getCredentials();
};
export const getUserStartTime = (state: IStore): number | undefined =>
  state.authState?.user?.userData.startTime;

export const getDeviceCreds = (state: IStore) => {
  if (state.authState.deviceCredentials !== undefined) {
    return state.authState.deviceCredentials;
  } else {
    return deviceCredentials;
  }
};
