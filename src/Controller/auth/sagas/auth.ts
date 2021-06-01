import { all, put, takeEvery, select } from 'redux-saga/effects';
import {
  DeviceCreateRequest,
  AuthRefreshRequestDTO,
  AuthUserResponseDTO,
} from '@ternala/frasier-types';

// Exceptions
import { BadRequest } from 'utils/API/Exceptions';

//APIs
import { AuthAPI } from '../transport/ath.api';

// Actions
import { getAccessToken, getRefreshToken } from '../index';
import {
  signIn,
  setAuthenticatedStatus,
  setAuthStateAction,
  logOut,
  refreshTokenAction,
  loginByTokenAction,
} from '../actions';

// Utils
import { clearAccess, saveAccess } from '../../../utils/manageAccess';
import { getCredentials } from '../../../utils/deviceCredentials';
import { isJWTTokenExpired } from '../../../utils/API';

// Interfaces
import { IAuthData, IDeviceCredentials } from '../model';
import { IException, IStore } from '../../model';

export async function checkAccessTokenExpired(
  { accessToken, refreshToken, deviceCredentials }: AuthRefreshRequestDTO,
  store?: IStore,
) {
  const isExpired = isJWTTokenExpired(accessToken);
  if (isExpired) {
    const res = await AuthAPI.refreshToken(deviceCredentials);
    if (typeof res === 'string') {
      console.error('something was wrong: ', res);
    } else {
      const authData = store?.authState.authData;
      if (authData) {
        authData.accessToken = res.accessToken;
        authData.refreshToken = res.refreshToken;
      }
      return res;
    }
  } else {
    return { accessToken, refreshToken };
  }
}

export function* signInSaga({ payload }: ReturnType<typeof signIn.request>) {
  yield put(
    setAuthStateAction({
      code: undefined,
      error: false,
      loaders: [],
      errors: [],
      isLoading: true,
      message: 'Loading...',
    }),
  );

  const deviceCredentials: IDeviceCredentials = yield getCredentials();

  try {
    AuthAPI.signIn(
      payload.receivedToken,
      payload.signIntype,
      deviceCredentials,
    );
  } catch (error) {
    clearAccess();
    if (error.statusCode === 401) {
      yield put(
        setAuthStateAction({
          code: error.statusCode,
          isLoading: false,
          message: 'The email/password combination you entered is incorrect.',
          error: true,
          loaders: [],
          errors: [],
        }),
      );
    } else {
      yield put(
        setAuthStateAction({
          isLoading: false,
          message: 'The email/password combination you entered is incorrect.',
          error: true,
          loaders: [],
          errors: [],
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
      // refreshToken,
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
    const res = yield AuthAPI.logout(deviceCredentials);

    if (!res && res.code) {
      yield put(logOut.failure('failure'));
    } else {
      yield put(logOut.success('success', '200 okay'));
    }
  } catch (error) {
    console.error(error);
    yield put(logOut.failure('failure'));
  }
}

export function* authActionSaga() {
  yield all([
    takeEvery(signIn.request, signInSaga),
    takeEvery(refreshTokenAction.request, refreshTokenSaga),
    // takeEvery(loginByTokenAction, signInSaga),
    takeEvery(logOut.request, logoutSaga),
  ]);
}
