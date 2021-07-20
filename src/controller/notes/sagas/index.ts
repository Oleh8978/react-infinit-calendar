import { all, put, select, takeEvery } from 'redux-saga/effects';

// exceptions
import { BadRequest } from '@app/utils/API/exceptions';

//APIs
import { notesAPI } from '../transport/notesTransport.api';

// Actions
import * as action from '../actions';

// utils
import { getAccessToken } from '@app/controller/auth';

export function* getNotesList({
  payload,
}: ReturnType<typeof action.getNotesList.request>) {
  try {
    yield put(
      action.setLoadingAction({
        status: true,
        isAnyError: false,
        error: '',
      }),
    );
    const accessToken: string | undefined = yield yield select(getAccessToken);

    const res = yield notesAPI.getNotesList(payload, accessToken);

    if (res) {
      yield put(
        action.getNotesList.success({
          response: res,
          searchParams: { ...payload },
        }),
      );
      yield put(
        action.setLoadingAction({
          status: false,
          isAnyError: false,
          error: '',
        }),
      );
    } else {
      yield put(
        action.setLoadingAction({
          status: false,
          isAnyError: false,
          error: '',
        }),
      );
      throw new BadRequest();
    }
  } catch (error) {
    console.log('ERROR NOTES: ', error);
    yield put(
      action.setLoadingAction({
        status: false,
        isAnyError: true,
        error: `Erorr in notes ${error}`,
      }),
    );
  }
}

export function* getNotesSaga() {
  yield all([takeEvery(action.getNotesList.request, getNotesList)]);
}
