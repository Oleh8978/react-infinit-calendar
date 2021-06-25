import { all, put, takeEvery, select } from 'redux-saga/effects';
// types
import {
  DeviceCreateRequest,
  AuthRefreshRequestDTO,
  AuthUserResponseDTO,
} from '@ternala/frasier-types';

// exeption
import { BadRequest } from '@app/utils/API/exceptions';

//APIs
import { AuthAPI } from '../transport/auth.api';

// Actions
import { getAccessToken, getRefreshToken } from '../index';
import {
  signIn,
  setAuthenticatedStatus,
  setAuthStateAction,
  logOut,
  deleteProfile,
  refreshTokenAction,
  loginByTokenAction,
} from '../actions';

// Utils
import { clearAccess, saveAccess } from '@app/utils/manageAccess';
import { getCredentials } from '@app/utils/deviceCredentials';
import { isJWTTokenExpired } from '@app/utils/API';

// Interfaces
import { IAuthData, IDeviceCredentials } from '../model';
import { IException, IStore } from '../../model';

export async function checkAccessTokenExpired(
  { accessToken, refreshToken, deviceCredentials }: AuthRefreshRequestDTO,
  store?: IStore,
) {
  const isExpired = isJWTTokenExpired(accessToken);
  if (isExpired) {
    const res = await AuthAPI.refreshToken(refreshToken, deviceCredentials);
    if (typeof res === 'string') {
    } else {
      let accessToken = store?.authState.accessToken;
      let refreshToken = store?.authState.refreshToken;
      if (accessToken && refreshToken) {
        accessToken = res.accessToken;
        refreshToken = res.refreshToken;
      }
      return res;
    }
  } else {
    return { accessToken, refreshToken };
  }
}

export function* signInSaga({
  payload,
}: ReturnType<typeof signIn.request> | ReturnType<typeof loginByTokenAction>) {
  yield put(
    setAuthStateAction({
      code: undefined,
      error: false,
      isLoading: true,
      message: 'Loading...',
    }),
  );

  const deviceCredentials: IDeviceCredentials = yield getCredentials();

  try {
    let signInData;
    if ('accessToken' in payload) {
      const tokens: AuthRefreshRequestDTO = yield checkAccessTokenExpired({
        accessToken: payload.accessToken,
        refreshToken: payload.accessToken,
        deviceCredentials,
      });
      if (typeof tokens === 'string') throw new BadRequest();
      signInData = {
        user: yield AuthAPI.loginByToken(tokens.accessToken),
        ...tokens,
      };
      setAuthStateAction({
        isLoading: false,
        message: 'success access token in payload',
        error: false,
      });
    } else {
      signInData = yield AuthAPI.signIn(
        payload.receivedToken,
        payload.signIntype,
        deviceCredentials,
      );
      setAuthStateAction({
        isLoading: true,
        message: 'success access token not in payload',
        error: false,
      });
    }
    console.log('sign in data ', signInData);
    if (signInData) {
      yield put(
        signIn.success({
          ...signInData,
          state: {
            isLoading: false,
          },
        }),
      );
      saveAccess(signInData.accessToken, signInData.refreshToken);
      yield put(setAuthenticatedStatus({ status: true }));
      setAuthStateAction({
        isLoading: false,
        message: 'sign in success',
        error: false,
      });
    } else {
      throw new BadRequest();
    }
    yield put(
      setAuthStateAction({
        isLoading: false,
        message: 'success',
        error: false,
      }),
    );
  } catch (error) {
    console.log('ERRROR AUTHENTIFICATION ', error);
    clearAccess();
    if (error.statusCode === 401) {
      yield put(
        setAuthStateAction({
          code: error.statusCode,
          isLoading: false,
          message: 'Something wrong with the account ',
          error: true,
        }),
      );
    } else {
      yield put(
        setAuthStateAction({
          isLoading: false,
          message: 'Something wrong with the account ',
          error: true,
        }),
      );
    }
  }
}

export function* refreshTokenSaga() {
  const refreshToken: string | undefined = yield select(getRefreshToken);
  const deviceCredentials: DeviceCreateRequest = yield getCredentials();

  if (!refreshToken) {
    yield put(
      refreshTokenAction.failure({
        code: '403',
        message: 'Something was wrong',
        name: 'BadRefreshToken',
      }),
    );
    return;
  }

  try {
    const res: IAuthData | IException | string = yield AuthAPI.refreshToken(
      refreshToken,
      deviceCredentials,
    );

    if (typeof res === 'string' || !('accessToken' in res)) {
      if (typeof res === 'string') {
        yield put(
          refreshTokenAction.failure({
            code: '400',
            message: 'Something was wrong',
            name: 'BadRefreshToken',
          }),
        );
      } else {
        yield put(
          refreshTokenAction.failure({
            code: res.code || '400',
            message: res.message || 'Something was wrong',
            name: 'BadRefreshToken',
          }),
        );
      }
    } else {
      yield put(refreshTokenAction.success(res));
    }
  } catch (error) {
    yield put(
      refreshTokenAction.failure({
        code: error.code || 403,
        message: error.message || error || 'Something was wrong',
        name: 'BadRefreshToken',
      }),
    );
  }
}

export function* logoutSaga() {
  const accessToken: string | undefined = yield yield select(getAccessToken);
  const refreshToken: string | undefined = yield select(getRefreshToken);
  const deviceCredentials: DeviceCreateRequest = yield getCredentials();
  try {
    if (!refreshToken || !accessToken) throw new Error("Haven't refresh token");
    const res = yield AuthAPI.logout(deviceCredentials, refreshToken);
    yield put(
      setAuthStateAction({
        isLoading: true,
        message: 'We are loging out ',
        error: true,
      }),
    );

    if (!res && res.code) {
      yield put(logOut.failure('failure'));
      yield put(
        setAuthStateAction({
          isLoading: false,
          message: 'Something wrong with the logout',
          error: true,
        }),
      );
    } else {
      yield put(logOut.success('success'));
      yield put(
        setAuthStateAction({
          isLoading: false,
          message: 'Successfully loged out ',
          error: true,
        }),
      );
    }
  } catch (error) {
    console.error('ERROR LOGOUT ', error);
    yield put(logOut.failure('failure'));
    yield put(
      setAuthStateAction({
        isLoading: false,
        message: `An error catched ${error} with code ${error.code}`,
        error: true,
      }),
    );
  }
}

export function* deleteAccountSaga() {
  const accessToken: string | undefined = yield yield select(getAccessToken);
  const refreshToken: string | undefined = yield select(getRefreshToken);
  try {
    if (!refreshToken || !accessToken) throw new Error("Haven't refresh token");
    const res = yield AuthAPI.deleteProfile(accessToken);
    yield put(
      setAuthStateAction({
        isLoading: true,
        message: 'We are deleting profile ',
        error: true,
      }),
    );

    if (!res && res.code) {
      yield put(
        deleteProfile.failure(res),
      );
      yield put(
        setAuthStateAction({
          isLoading: false,
          message: 'Something wrong with the delete',
          error: true,
        }),
      );
    } else {
      yield put(deleteProfile.success('success'));
      yield put(
        setAuthStateAction({
          isLoading: false,
          message: 'Successfully deleted ',
          error: true,
        }),
      );
    }
  } catch (error) {
    console.error('ERROR DELETE ', error);
    deleteProfile.failure(error),
      yield put(
        setAuthStateAction({
          isLoading: false,
          message: `An error catched ${error} with code ${error.code}`,
          error: true,
        }),
      );
  }
}

export function* authActionSaga() {
  yield all([
    takeEvery(signIn.request, signInSaga),
    takeEvery(refreshTokenAction.request, refreshTokenSaga),
    takeEvery(loginByTokenAction, signInSaga),
    takeEvery(deleteProfile.request, deleteAccountSaga),
    takeEvery(logOut.request, logoutSaga),
  ]);
}
