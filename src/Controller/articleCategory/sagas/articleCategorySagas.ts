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
  yield put(
    actions.setLoadingAction({
      status: true,
      anyErrors: false,
      error: `No errors got because loading is started`,
    }),
  );
  try {
    if (!accessToken) throw new Error('Not authorized');
    const res = yield ArticleCategoryAPI.getArticleCategories(
      payload,
      accessToken,
    );
    if (!res && res.code) {
      yield put(
        actions.setLoadingAction({
          status: true,
          anyErrors: true,
          error: ` error code is ${res.code}`,
        }),
      );
    } else {
      yield put(
        actions.setLoadingAction({
          status: false,
          anyErrors: false,
          error: `No errors got `,
        }),
      );
      yield put(
        actions.getArticlesCategoriesAction.success({
          response: res,
          searchParams: payload,
          isAll: payload.limit ? res.items.length < payload.limit : true,
        }),
      );
    }
    if (typeof payload.callback === 'function') payload.callback();
  } catch (error) {
    console.log('ERROR ARTICLE CATEGORY MENU IN DISCOVERY', error);
    yield put(
      actions.setLoadingAction({
        status: false,
        anyErrors: false,
        error: `An error catched ${error}`,
      }),
    );
  }
}

export function* ArticleCategoriesSaga() {
  yield all([
    takeEvery(actions.getArticlesCategoriesAction.request, getDiscoveriesSaga),
  ]);
}
