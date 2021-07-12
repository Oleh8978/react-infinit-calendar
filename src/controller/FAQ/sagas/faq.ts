import { all, put, takeEvery, select } from 'redux-saga/effects';

// exeption
import { BadRequest } from '@app/utils/API/exceptions';

//APIs
import { faqAPI } from '../transport/faq.api';

// Actions
import * as action from '../actions';

// Interfaces
import { IfaqState, IsubmitData, IloaderState } from '../models';

export function* submitData({
  payload,
}: ReturnType<typeof action.submitAnswer.request>) {
  yield put(
    action.setLoadingAction({
      isLoading: true,
      isError: false,
      error: '',
    }),
  );

  try {
    const resp = yield faqAPI.submitDataAPI(
      payload.receivedToken,
      payload.categoryID,
      payload.description,
    );
    if (resp === true) {
      yield put(
        action.submitAnswer.success({
          categoryID: payload.categoryID,
          description: payload.description,
        }),
      );
      yield put(
        action.setLoadingAction({
          isLoading: false,
          isError: false,
          error: '',
        }),
      );
    }
  } catch (error) {
    console.log('SUBMIT QUESTION ERROR: ', error);
    yield put(
      action.setLoadingAction({
        isLoading: false,
        isError: true,
        error: `The erorr happend after loading ${error}`,
      }),
    );
  }
}

export function* submitAnswerSaga() {
  yield all([takeEvery(action.submitAnswer.request, submitData)]);
}
