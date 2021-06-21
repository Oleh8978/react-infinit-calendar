import { all, put, takeEvery } from 'redux-saga/effects';

// Exceptions
import { BadRequest } from '@app/utils/API/exceptions';

//APIs
import { HolidayAPI } from '../transport/holiday.api';

// Actions
import * as action from '../actions';

// Utils
import { getSavedAccess } from '@app/utils/manageAccess';

export function* getHolidayData({
  payload,
}: ReturnType<typeof action.getHolidayDataAction.request>) {
  yield put(
    action.LoaderAction({
      code: undefined,
      error: false,
      isLoading: true,
      message: 'Loading...',
    }),
  );

  try {
    const res = yield HolidayAPI.getHoliday(
      payload,
      getSavedAccess().accessToken,
    );

    if (res) {
      yield put(action.getHolidayDataAction.success(res));
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
    action.getHolidayDataAction.failure({
      code: error.statusCode,
      message: 'Failure to load and sent updated data',
      name: 'Post updated failure',
    });
  }
}

export function* deleteHolidaySaga({
  payload,
}: ReturnType<typeof action.deleteHolidayDataAction.request>) {
  yield put(
    action.LoaderAction({
      code: undefined,
      error: false,
      isLoading: true,
      message: 'Loading...',
    }),
  );

  try {
    const res = yield HolidayAPI.createExclude(
      payload,
      getSavedAccess().accessToken,
    );

    if (res) {
      yield put(
        action.deleteHolidayDataAction.success({
          ...res,
          additionalFields: payload,
        }),
      );
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
    action.deleteHolidayDataAction.failure({
      code: error.statusCode,
      message: 'Failure to load and sent updated data',
      name: 'Post updated failure',
    });
  }
}

export function* getHolidayDataSaga() {
  yield all([
    takeEvery(action.getHolidayDataAction.request, getHolidayData),
    takeEvery(action.deleteHolidayDataAction.request, deleteHolidaySaga),
  ]);
}
