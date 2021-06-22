import { all, put, takeEvery, select } from 'redux-saga/effects';
// types
import { UserDataFullDTO } from '@ternala/frasier-types';

// exceptions
import { BadRequest } from '@app/utils/API/exceptions';

//APIs
import { UpdateUserApi } from '../transport/secondStep.api';

// Actions
import * as action from '../actions';

// utils
import {
  getSavedAccess,
} from '@app/utils/manageAccess';

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
    const UserData = yield UpdateUserApi.updateUserAfterLogIn(
      { ...payload },
      getSavedAccess().accessToken,
    );

    if (UserData) {
      action.updateUserDataAction.success({
        ...payload,
      });
      yield put(action.setIsSecondStepPassed({ isSecondStepPassed: true }));
      yield put(
        action.LoaderAction({
          code: undefined,
          error: false,
          isLoading: false,
          message: 'success loaded and put',
        }),
      );
    } else {
      yield put(action.setIsSecondStepPassed({ isSecondStepPassed: false }));
      yield put(
        action.LoaderAction({
          code: undefined,
          error: false,
          isLoading: false,
          message: 'error while puting the data posted',
        }),
      );
      throw new BadRequest();
    }
  } catch (error) {
    yield put(action.setIsSecondStepPassed({ isSecondStepPassed: false }));
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
