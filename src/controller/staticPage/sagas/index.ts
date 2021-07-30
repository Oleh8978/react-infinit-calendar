import { all, put, select, takeEvery } from 'redux-saga/effects';

// exceptions
import { BadRequest } from '@app/utils/API/exceptions';

//APIs
import { staticAPI } from '../transport/static.api';

// Actions
import * as action from '../actions';

// utils
import { getAccessToken } from '@app/controller/auth';

export function* getPage({
  payload,
}: ReturnType<typeof action.getPageBySlug.request>) {
  try {
    yield put(
      action.setLoadingAction({
        status: true,
        isAnyError: false,
        error: '',
      }),
    );

    const res = yield staticAPI.getPage(payload);

    if (res) {
      yield put(
        action.getPageBySlug.success({
          ...res,
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
    console.log('ERROR STATIC: ', error);
    yield put(
      action.setLoadingAction({
        status: false,
        isAnyError: true,
        error: `Erorr in static page: ${error}`,
      }),
    );
  }
}

export function* getStaticPageSaga() {
  yield all([takeEvery(action.getPageBySlug.request, getPage)]);
}
