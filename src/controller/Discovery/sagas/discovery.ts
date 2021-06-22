import { all, put, takeEvery, select } from 'redux-saga/effects';

//APIs
import { DiscoveryAPI } from '../transport/discovery.api';
import { getAccessToken } from '../../auth';

// Actions
import * as actions from '../actions';

export function* getDiscoveriesSaga({
  payload,
}: ReturnType<typeof actions.getDiscoveryList.request>) {
  const accessToken: string | undefined = yield yield select(getAccessToken);

  yield put(
    actions.setLoadingAction({
      status: true,
    }),
  );
  try {
    if (!accessToken) throw new Error('Not authorized');
    const res = yield DiscoveryAPI.getDiscovery(payload, accessToken);
    if (!res && res.code) {
      yield put(
        actions.setLoadingAction({
          status: false,
        }),
      );
    } else {
      yield put(
        actions.setLoadingAction({
          status: false,
        }),
      );
      yield put(
        actions.getDiscoveryList.success({
          response: res,
          searchParams: { ...payload },
        }),
      );
    }
    console.log('payload ################################', res)
    if (typeof payload.callback === 'function') payload.callback();
  } catch (error) {
    console.log('error and payload ################################', payload)
    console.log('ERORR DISCOVERY', error);
    yield put(
      actions.setLoadingAction({
        status: false,
      }),
    );
    yield put(
      actions.getDiscoveryList.failure({
        code: `error code ${error.code}`,
        message: 'something went wrong ',
        name: `error name is ${error}`,
      }),
    );
  }
}

export function* DiscoveryListSaga() {
  yield all([takeEvery(actions.getDiscoveryList.request, getDiscoveriesSaga)]);
}
