import { all, put, takeEvery, select } from 'redux-saga/effects';
// types
import {
  DeviceCreateRequest,
  AuthRefreshRequestDTO,
  AuthUserResponseDTO,
} from '@ternala/frasier-types';

// Exceptions
import { BadRequest } from 'utils/API/Exceptions';

//APIs
import { userDataAPI } from '../transport/account.api';

// actions
import * as actions from '../actions';

// models
import { IUser } from '../models';

// Utils
import { getSavedAccess } from '../../../utils/manageAccess';

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
    if (!tokens.accessToken) throw new Error('Not authorized');
    const userData: IUser = yield userDataAPI.getDataByToken(
      tokens.accessToken,
    );

    if (userData !== undefined) {
      yield put(actions.getUserAction.success(userData));
    }
    console.log('user data ', userData);
    yield put(
      actions.setLoadingAction({
        status: false,
      }),
    );
  } catch (error) {
    console.log('USERDATA ERROR ', error);
    yield put(
      actions.setLoadingAction({
        status: false,
      }),
    );
    yield put(
      actions.getUserAction.failure({
        code: `Error from user data get ${error.code}`,
        message: 'Error in user data get controller ',
        name: `Error name ${error}`,
      }),
    );
  }
}

export function* accountSaga() {
  yield all([takeEvery(actions.getUserAction.request, getUserData)]);
}
