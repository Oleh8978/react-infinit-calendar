import { all, put, takeEvery, select } from 'redux-saga/effects';

//APIs
import { ArticleAPI } from '../transport/article.api';
import { getAccessToken } from '../../auth';

// Actions
import * as actions from '../actions';

export function* getArticlelistSagas({
  payload,
}: ReturnType<typeof actions.getArticleListByModuleCqategory.request>) {
  const accessToken: string | undefined = yield yield select(getAccessToken);

  try {
    if (!accessToken) throw new Error('Not authorized');
    const res = yield ArticleAPI.getArticleList(payload, accessToken);

    yield put(
      actions.setLoadingAction({
        status: true,
      }),
    );
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
        actions.getArticleListByModuleCqategory.success({
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
      }),
    );
  }
}

export function* ArticleListSgas() {
  yield all([
    takeEvery(
      actions.getArticleListByModuleCqategory.request,
      getArticlelistSagas,
    ),
  ]);
}
