import { all, put, select, takeEvery } from 'redux-saga/effects';

// exceptions
import { BadRequest } from '@app/utils/API/exceptions';

//APIs
import { staticAPI } from '../../staticPage/transport/static.api';

// Actions
import * as action from '../../staticPage/actions';

// utils
import { getAccessToken } from '@app/controller/auth';

export function* getStaticPagesList({
  payload,
}: ReturnType<typeof action.staticPagesList.request>) {
  try {
    yield put(
      action.setLoadingAction({
        status: true,
        isAnyError: false,
        error: '',
      }),
    );
    const accessToken: string | undefined = yield yield select(getAccessToken);

    const res = yield staticAPI.getStaticPagesList(accessToken);

    if (res) {
      yield put(
        action.staticPagesList.success({
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

export function* getStaticListPagesSaga() {
  yield all([takeEvery(action.staticPagesList.request, getStaticPagesList)]);
}
