import { all, put, takeEvery, select } from 'redux-saga/effects';

//APIs
import { tipsApi } from '../transport/tips.api';

// Actions
import * as actions from '../actions';

// utils 
import { getSavedAccess} from '@app/utils/manageAccess';

export function* getTipListSagas({
  payload,
}: ReturnType<typeof actions.getTipsListRequest.request>) {
  yield put(
    actions.setLoadingAction({
      status: true,
      isAnyErrors: false,
      error: '',
    }),
  );
  try {
    const res = yield tipsApi.getListTipsApi(
      payload.searchParams,
      payload.userId,
      getSavedAccess().accessToken,
    );
    if (!res && res.code) {
      yield put(
        actions.setLoadingAction({
          status: false,
          isAnyErrors: true,
          error: '',
        }),
      );
    } else {
      yield put(
        actions.setLoadingAction({
          status: false,
          isAnyErrors: false,
          error: '',
        }),
      );
      yield put(
        actions.getTipsListRequest.success({
          response: res,
          searchParams: { ...payload.searchParams },
        }),
      );
    }
  } catch (error) {
    console.log('ERORR DISCOVERY', error);
    yield put(
      actions.getTipsListRequest.failure({
        status: false,
        isAnyErrors: true,
        error: `Error is ${error}`,
      }),
    );
  }
}

export function* postReadedItemsSaga({
  payload,
}: ReturnType<typeof actions.setReadedItems.request>) {
  yield put(
    actions.setLoadingAction({
      status: true,
      isAnyErrors: false,
      error: '',
    }),
  );
  try {
    const res = yield tipsApi.setReadTipsAPI(
      payload.accessToken,
      payload.readedIds,
    );
    if (!res && !res.code) {
      yield put(
        actions.setLoadingAction({
          status: false,
          isAnyErrors: false,
          error: '',
        }),
      );
    } else {
      yield put(
        actions.setLoadingAction({
          status: false,
          isAnyErrors: true,
          error: '',
        }),
      );
    }
  } catch (error) {
    console.log('ERORR DISCOVERY', error);
    yield put(
      actions.getTipsListRequest.failure({
        status: false,
        isAnyErrors: true,
        error: `Error is ${error}`,
      }),
    );
  }
}

export function* TipsListSaga() {
  yield all([takeEvery(actions.getTipsListRequest.request, getTipListSagas),
    takeEvery(actions.setReadedItems.request, postReadedItemsSaga)]);
}
