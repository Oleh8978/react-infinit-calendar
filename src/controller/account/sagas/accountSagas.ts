import { all, put, takeEvery, select } from 'redux-saga/effects';
// types
import {
  DeviceCreateRequest,
  AuthRefreshRequestDTO,
  AuthUserResponseDTO,
} from '@ternala/frasier-types';

// exceptions
//import { BadRequest } from 'utils/API/exceptions';

//APIs
import { userDataAPI } from '../transport/account.api';

// actions
import * as actions from '../actions';

// utils
import {
  clearAccess,
  saveAccess,
  getSavedAccess,
} from '@app/utils/manageAccess';

// Interfaces
import { IAccountState } from '../models';
import { IException, IStore } from '../../model';

export function* getUserData({
  payload,
}: ReturnType<typeof actions.getUserAction.request>) {
  yield put(
    actions.setLoadingAction({
      status: true,
    }),
  );

  try {
    const tokens = getSavedAccess();
    const userData = {
      ...(yield userDataAPI.getDataByToken(tokens.accessToken)),
    };
    console.log('userData ', userData);
    // if ('accessToken' in payload) {
    //   console.log('accessToken in payload', payload);
    //   const tokens: AuthRefreshRequestDTO = yield checkAccessTokenExpired({
    //     accessToken: payload.accessToken,
    //     refreshToken: payload.accessToken,
    //     deviceCredentials,
    //   });
    //   if (typeof tokens === 'string') throw new BadRequest();
    //   signInData = {
    //     user: yield AuthAPI.loginByToken(tokens.accessToken),
    //     ...tokens,
    //   };
    //   console.log('signInData auth ', signInData);
    //   setAuthStateAction({
    //     isLoading: false,
    //     message: 'success access token in payload',
    //     error: false,
    //   });
    // } else {
    //   console.log(
    //     'payload.receivedToken, ',
    //     payload.receivedToken,
    //     'payload.signIntype,',
    //     payload.signIntype,
    //     'deviceCredentials, ',
    //     deviceCredentials,
    //   );
    //   signInData = yield AuthAPI.signIn(
    //     payload.receivedToken,
    //     payload.signIntype,
    //     deviceCredentials,
    //   );
    //   setAuthStateAction({
    //     isLoading: true,
    //     message: 'success access token not in payload',
    //     error: false,
    //   });
    // }

    // if (signInData) {
    //   console.log('sign in data ', signInData);
    //   yield put(
    //     signIn.success({
    //       ...signInData,
    //       state: {
    //         isLoading: false,
    //       },
    //     }),
    //   );
    //   saveAccess(signInData.accessToken, signInData.refreshToken);
    //   yield put(setAuthenticatedStatus({ status: true }));
    //   setAuthStateAction({
    //     isLoading: false,
    //     message: 'sign in success',
    //     error: false,
    //   });
    // } else {
    //   throw new BadRequest();
    // }
    // yield put(
    //   setAuthStateAction({
    //     isLoading: false,
    //     message: 'success',
    //     error: false,
    //   }),
    // );
  } catch (error) {
    console.log('eroror receivd ', error);
    // clearAccess();
    // if (error.statusCode === 401) {
    //   yield put(
    //     setAuthStateAction({
    //       code: error.statusCode,
    //       isLoading: false,
    //       message: 'Something wrong with the account ',
    //       error: true,
    //     }),
    //   );
    // } else {
    //   yield put(
    //     setAuthStateAction({
    //       isLoading: false,
    //       message: 'Something wrong with the account ',
    //       error: true,
    //     }),
    //   );
    // }
  }
}

export function* accountSaga() {
  yield all([getSavedAccess()]);
}
