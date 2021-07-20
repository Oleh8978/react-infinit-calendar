import { all, put, takeEvery, select } from 'redux-saga/effects';

//APIs
import { ExpertsListAPI } from '../transport/exprts.api';
import { getAccessToken } from '../../auth';

// Actions
import * as actions from '../actions';

export function* getExpertsList({
  payload,
}: ReturnType<typeof actions.getExpersList.request>) {
  const accessToken: string | undefined = yield yield select(getAccessToken);

  try {
    yield put(
      actions.setLoadingAction({
        status: true,
        isAnyError: false,
        error: '',
      }),
    );
    if (!accessToken) throw new Error('Not authorized');
    const res = yield ExpertsListAPI.getExpertsApi(payload, accessToken);
    if (!res && res.code) {
      yield put(
        actions.setLoadingAction({
          status: false,
          isAnyError: false,
          error: '',
        }),
      );
    } else {
      yield put(
        actions.setLoadingAction({
          status: false,
          isAnyError: true,
          error: 'Bad request',
        }),
      );
      yield put(
        actions.getExpersList.success({
          response: res,
          searchParams: { ...payload },
        }),
      );
    }
    if (typeof payload.callback === 'function') payload.callback();
  } catch (error) {
    console.log('ERORR DISCOVERY', error);
    yield put(
      actions.setLoadingAction({
        status: false,
        isAnyError: true,
        error: `Error in experts list ${error}`,
      }),
    );
  }
}

export function* ExpertsListSaga() {
  yield all([takeEvery(actions.getExpersList.request, getExpertsList)]);
}
