import { all, put, takeEvery, select } from 'redux-saga/effects';

//APIs
import { getSurveysAPI } from '../transport/survey.api';

// Actions
import * as actions from '../actions';

// utils
import { getSavedAccess } from '@app/utils/manageAccess';

export function* getSurveysSaga({
  payload,
}: ReturnType<typeof actions.getSurveysRequest.request>) {
  yield put(
    actions.setLoadingAction({
      status: true,
    }),
  );
  try {
    const res = yield getSurveysAPI.getSurveys(
      payload.searchParams,
      getSavedAccess().accessToken,
      payload.survey,
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
        actions.getSurveysRequest.success({
          response: res,
          searchParams: { ...payload.searchParams },
        }),
      );
    }
  } catch (error) {
    console.log('ERORR SURVEYS', error);
    yield put(
      actions.getSurveysRequest.failure({
        status: false,
      }),
    );
  }
}

export function* sendSurveyData({
  payload,
}: ReturnType<typeof actions.submitAnswerRequest.request>) {
  yield put(
    actions.setLoadingAction({
      status: true,
    }),
  );
  try {
    const res = yield getSurveysAPI.postSurveyResults(
      getSavedAccess().accessToken,
      payload.questionResults,
      payload.survey,
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
    }
  } catch (error) {
    console.log('ERORR SURVEY', error);
    yield put(
      actions.getSurveysRequest.failure({
        status: false,
      }),
    );
  }
}

export function* SurveyListSaga() {
  yield all([
    takeEvery(actions.getSurveysRequest.request, getSurveysSaga),
    takeEvery(actions.submitAnswerRequest.request, sendSurveyData),
  ]);
}
