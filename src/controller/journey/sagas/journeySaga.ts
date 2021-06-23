import { all, put, takeEvery } from 'redux-saga/effects';

// exceptions
import { BadRequest } from '@app/utils/API/exceptions';

//APIs
import { JourneyAPI } from '../transport/journey.api';

// Actions
import * as action from '../actions';

// utils
import { getSavedAccess } from '@app/utils/manageAccess';

export function* getJourneyData({ payload }: ReturnType<typeof action.getJourneyDataAction.request>) {
  yield put(
    action.LoaderAction({
      code: undefined,
      error: false,
      isLoading: true,
      message: 'Loading...',
    }),
  );

  try {
    const res = yield JourneyAPI.getJourney(
      payload,
      getSavedAccess().accessToken,
    );

    if (res) {
      yield put(action.getJourneyDataAction.success(res));
      yield put(
        action.LoaderAction({
          code: undefined,
          error: false,
          isLoading: false,
          message: 'success loaded and put',
        }),
      );
    } else {
      yield put(
        action.LoaderAction({
          code: undefined,
          error: false,
          isLoading: false,
          message: 'error while puting the data posted',
        }),
      );
      throw new BadRequest();
    }
  } catch (error) {
    console.log('error ', error);
    yield put(
      action.LoaderAction({
        code: error.code,
        error: true,
        isLoading: false,
        message: 'failure not loaded and not sent',
      }),
    );
    action.getJourneyDataAction.failure({
      code: error.statusCode,
      message: 'Failure to load and sent updated data',
      name: 'Post updated failure',
    });
  }
}

export function* getJourneyDataSaga() {
  yield all([
    takeEvery(action.getJourneyDataAction.request, getJourneyData)
  ]);
}
