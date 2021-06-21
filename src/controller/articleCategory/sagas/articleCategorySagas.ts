import { all, put, takeEvery, select } from 'redux-saga/effects';

//APIs
import { ArticleCategoryAPI } from '../transport/articleCategoy.api';
import { getAccessToken } from '../../auth';

// Actions
import * as actions from '../actions';

export function* getDiscoveriesSaga({
  payload,
}: ReturnType<typeof actions.getArticlesCategoriesAction.request>) {
  const accessToken: string | undefined = yield yield select(getAccessToken);
//   const additionalFields = {
//     property: payload.property,
//   };
  //   yield put(
  //     addLeaseTransactionLoader({
  //       id: loadId,
  //       message: 'Please wait, leases are loading!',
  //       type: LoaderAction.lease.getList,
  //       additionalFields,
  //     }),
  //   );
  try {
    if (!accessToken) throw new Error('Not authorized');
    const res = yield ArticleCategoryAPI.getArticleCategories(
      payload,
      accessToken,
    );
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
    } else {
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
        actions.getArticlesCategoriesAction.success({
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
      console.log('error ', error)
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

export function* ArticleCategoriesSaga() {
  yield all([
    takeEvery(actions.getArticlesCategoriesAction.request, getDiscoveriesSaga),
  ]);
}
