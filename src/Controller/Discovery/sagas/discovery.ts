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
  const additionalFields = {
    property: payload.property,
  };

  yield put(
    actions.setLoadingAction({
      status: true,
    }),
  );
  try {
    if (!accessToken) throw new Error('Not authorized');
    const res = yield DiscoveryAPI.getDiscovery(payload, accessToken);
    if (!res && res.code) {
      //   yield put(
      //     getLeaseTransactionsAction.failure({
      //       code: res.code,
      //       message: res.message || 'Something was wrong',
      //     }),
      //   );
      //   yield put(
      //     addLeaseTransactionError({
      //       id: loadId,
      //       message: 'Failed to get leases!',
      //       type: LoaderAction.lease.getList,
      //       additionalFields,
      //     }),
      //   );
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
      //   yield put(
      //   getLeaseTransactionsAction.success({
      //     response: res,
      //     searchParams: payload,
      //     additionalFields: {
      //       property: payload.property,
      //     },
      //     isAll: payload.limit ? res.items.length < payload.limit : true,
      //   }),
      //   );
      yield put(
        actions.getDiscoveryList.success({
          response: res,
          searchParams: payload,
          isAll: payload.limit ? res.items.length < payload.limit : true,
        }),
      );
      //   yield put(
      //     removeLeaseTransactionLoader({
      //       id: loadId,
      //       additionalFields,
      //     }),
      //   );
    }
    if (typeof payload.callback === 'function') payload.callback();
  } catch (error) {
    yield put(
      actions.setLoadingAction({
        status: false,
      }),
    );
    // yield put(
    //   getLeaseTransactionAction.failure({
    //     code: error.code || 400,
    //     message: error.message || error || 'Something was wrong',
    //   }),
    // );
    // yield put(
    //   addLeaseTransactionError({
    //     id: loadId,
    //     message: 'Failed to get leases!',
    //     type: LoaderAction.lease.getList,
    //     additionalFields,
    //   }),
    // );
  }
}

export function* DiscoveryListSaga() {
  yield all([takeEvery(actions.getDiscoveryList.request, getDiscoveriesSaga)]);
}
