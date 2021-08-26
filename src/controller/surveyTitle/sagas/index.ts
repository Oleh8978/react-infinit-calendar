import { all, put, takeEvery } from 'redux-saga/effects';

//APIs
import { getSurveyInfoAPI } from '../transport/transport.api';

// Actions
import * as actions from '../actions';

export function* getSurveyTitleSaga({
  payload,
}: ReturnType<typeof actions.getSurveyTitle.request>) {
  yield put(
    actions.setLoadingAction({
      status: true,
    }),
  );
  try {
    const res = yield getSurveyInfoAPI.getSurveyTitle(payload);
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
      yield put(actions.getSurveyTitle.success(res.title));
    }
  } catch (error) {
    console.log('ERORR SURVEYS', error);
    yield put(
      actions.setLoadingAction({
        status: false,
      }),
    );
  }
}

export function* surveyTitleSaga() {
  yield all([takeEvery(actions.getSurveyTitle.request, getSurveyTitleSaga)]);
}
