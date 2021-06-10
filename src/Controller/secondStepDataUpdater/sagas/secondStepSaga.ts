import { all, put, takeEvery, select } from 'redux-saga/effects';
// types
import { UserDataFullDTO } from '@ternala/frasier-types';

// Exceptions
import { BadRequest } from 'utils/API/Exceptions';

//APIs
import { UpdateUserApi } from '../transport/secondStep.api';

// Actions

import * as action from '../actions';

// Utils
import { clearAccess, saveAccess } from '../../../utils/manageAccess';

// Interfaces
import { IException, IStore } from '../../model';

export function* updateUserData({
  payload,
}: ReturnType<typeof action.updateUserDataAction.request>) {
  yield put(
    action.LoaderAction({
      code: undefined,
      error: false,
      isLoading: true,
      message: 'Loading...',
    }),
  );

  try {
    yield put(
      action.LoaderAction({
        code: undefined,
        error: false,
        isLoading: false,
        message: 'success loaded and posted',
      }),
    );
    const UserData = yield UpdateUserApi.updateUserAfterLogIn({
      ...payload,
    });

    if (UserData) {
      action.updateUserDataAction.success({
        ...payload,
      });
    } else {
      throw new BadRequest();
    }
  } catch (error) {
    console.log('error ', error);
    yield put(
      action.LoaderAction({
        code: error.code,
        error: true,
        isLoading: false,
        message: 'failure not loaded and not sent',
      }),
    );
    action.updateUserDataAction.failure({
      code: error.statusCode,
      message: 'Failur to load and sent updated data',
      name: 'Post updated failure',
    });
  }
}

export function* updateUserDataSaga() {
  yield all([takeEvery(action.updateUserDataAction.request, updateUserData)]);
}
