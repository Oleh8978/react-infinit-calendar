import { all, put, select, takeEvery } from 'redux-saga/effects';

// exceptions
import { BadRequest } from '@app/utils/API/exceptions';

//APIs
import { getExpertAPI } from '../transport/expert.api';

// Actions
import * as action from '../actions';

// utils
import { getAccessToken } from '@app/controller/auth';

export function* getExpertByID({
  payload,
}: ReturnType<typeof action.getExpertById.request>) {
  try {
    yield put(
      action.setLoadingAction({
        status: true,
        isAnyError: false,
        error: '',
      }),
    );
    const accessToken: string | undefined = yield yield select(getAccessToken);

    const res = yield getExpertAPI.getExpertByID(payload, accessToken);

    if (res) {
      yield put(
        action.getExpertById.success({
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
    console.log('ERROR SINGLE EXPERT: ', error);
    yield put(
      action.setLoadingAction({
        status: false,
        isAnyError: true,
        error: `Erorr in static page: ${error}`,
      }),
    );
  }
}

export function* getExpert() {
  yield all([takeEvery(action.getExpertById.request, getExpertByID)]);
}
