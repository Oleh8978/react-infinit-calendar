import { all, put, takeEvery, select } from 'redux-saga/effects';
import {
  addException, clearExceptions,
  deleteDayOffAction,
  getDaysOffAction,
  getScheduleAction,
  getUncompletedTimeSlotsAction,
  setDayOffAction,
} from '../actions';
import { getAccessToken } from '../../auth';
import uuid from '@app/utils/uuid';
import { addError, addLoader, removeLoader } from '../index';
import { LoaderAction } from '@app/config/constants';
import { ScheduleAPI } from '../transport/schedule.api';

export function* getScheduleSaga({
  payload,
}: ReturnType<typeof getScheduleAction.request>) {
  const accessToken: string | undefined = yield yield select(getAccessToken);
  const loadId = uuid();
  yield put(
    addLoader({
      id: loadId,
      message: 'Please wait, schedule are loading!',
      type: LoaderAction.schedule.getSchedule,
    }),
  );
  try {
    if (!accessToken) throw new Error('Not authorized');
    const res = yield ScheduleAPI.getTimeSlots(payload, accessToken);
    if (!res && res.code) {
      yield put(
        getScheduleAction.failure({
          code: res.code,
          message: res.message || 'Something was wrong',
        }),
      );
      yield put(
        addError({
          id: loadId,
          message: 'Failed to get schedule!',
          type: LoaderAction.schedule.getSchedule,
        }),
      );
    } else {
      yield put(
        getScheduleAction.success({
          response: res,
          searchParams: payload,
        }),
      );
      yield put(clearExceptions('All is ok'));
      yield put(
        removeLoader({
          id: loadId,
        }),
      );
    }
  } catch (error) {
    console.error('error: ', error);
    if (error.code === 422) {
      yield put(addException(error.response.journey));
    }

    yield put(
      getScheduleAction.failure({
        code: error.code || 400,
        message: error.message || error || 'Something was wrong',
      }),
    );
    yield put(
      addError({
        id: loadId,
        message: 'Failed to get schedule!',
        type: LoaderAction.schedule.getSchedule,
      }),
    );
  }
}

export function* getUncompletedTimeSlotsSaga({
  payload,
}: ReturnType<typeof getUncompletedTimeSlotsAction.request>) {
  const accessToken: string | undefined = yield yield select(getAccessToken);
  const loadId = uuid();
  yield put(
    addLoader({
      id: loadId,
      message: 'Please wait, uncompleted time slots are loading!',
      type: LoaderAction.schedule.getUncompletedTimeSlots,
    }),
  );
  try {
    if (!accessToken) throw new Error('Not authorized');
    const res = yield ScheduleAPI.getUncompletedTimeSlots(payload, accessToken);
    if (!res && res.code) {
      yield put(
        getUncompletedTimeSlotsAction.failure({
          code: res.code,
          message: res.message || 'Something was wrong',
        }),
      );
      yield put(
        addError({
          id: loadId,
          message: 'Failed to get uncompleted time slots!',
          type: LoaderAction.schedule.getUncompletedTimeSlots,
        }),
      );
    } else {
      yield put(
        getUncompletedTimeSlotsAction.success({
          response: res,
          searchParams: payload,
        }),
      );
      yield put(
        removeLoader({
          id: loadId,
        }),
      );
    }
  } catch (error) {
    console.error('error: ', error);
    yield put(
      getUncompletedTimeSlotsAction.failure({
        code: error.code || 400,
        message: error.message || error || 'Something was wrong',
      }),
    );
    yield put(
      addError({
        id: loadId,
        message: 'Failed to get uncompleted time slots!',
        type: LoaderAction.schedule.getSchedule,
      }),
    );
  }
}

export function* getDaysOffSaga({
  payload,
}: ReturnType<typeof getDaysOffAction.request>) {
  const accessToken: string | undefined = yield yield select(getAccessToken);
  const loadId = uuid();
  yield put(
    addLoader({
      id: loadId,
      message: 'Please wait, days off are loading!',
      type: LoaderAction.schedule.getDaysOff,
    }),
  );
  try {
    if (!accessToken) throw new Error('Not authorized');
    const res = yield ScheduleAPI.getDaysOff(payload, accessToken);
    if (!res && res.code) {
      yield put(
        getDaysOffAction.failure({
          code: res.code,
          message: res.message || 'Something was wrong',
        }),
      );
      yield put(
        addError({
          id: loadId,
          message: 'Failed to get days off!',
          type: LoaderAction.schedule.getDaysOff,
        }),
      );
    } else {
      yield put(
        getDaysOffAction.success({
          response: res,
          additionalFields: payload,
        }),
      );
      yield put(
        removeLoader({
          id: loadId,
        }),
      );
    }
  } catch (error) {
    console.error('error: ', error);
    yield put(
      getDaysOffAction.failure({
        code: error.code || 400,
        message: error.message || error || 'Something was wrong',
      }),
    );
    yield put(
      addError({
        id: loadId,
        message: 'Failed to get days off!',
        type: LoaderAction.schedule.getDaysOff,
      }),
    );
  }
}

export function* setDayOffSaga({
  payload,
}: ReturnType<typeof setDayOffAction.request>) {
  const accessToken: string | undefined = yield yield select(getAccessToken);
  const loadId = uuid();
  yield put(
    addLoader({
      id: loadId,
      message: 'Please wait, day off are setting!',
      type: LoaderAction.schedule.setDayOff,
    }),
  );
  try {
    if (!accessToken) throw new Error('Not authorized');
    const res = yield ScheduleAPI.setDayOff(payload, accessToken);
    if (!res && res.code) {
      yield put(
        setDayOffAction.failure({
          code: res.code,
          message: res.message || 'Something was wrong',
        }),
      );
      yield put(
        addError({
          id: loadId,
          message: 'Failed to set day off!',
          type: LoaderAction.schedule.setDayOff,
        }),
      );
    } else {
      yield put(
        setDayOffAction.success({
          response: res,
          additionalFields: payload,
        }),
      );
      yield put(
        removeLoader({
          id: loadId,
        }),
      );
    }
  } catch (error) {
    console.error('error: ', error);
    yield put(
      setDayOffAction.failure({
        code: error.code || 400,
        message: error.message || error || 'Something was wrong',
      }),
    );
    yield put(
      addError({
        id: loadId,
        message: 'Failed to set day off!',
        type: LoaderAction.schedule.setDayOff,
      }),
    );
  }
}

export function* deleteDayOffSaga({
  payload,
}: ReturnType<typeof deleteDayOffAction.request>) {
  const accessToken: string | undefined = yield yield select(getAccessToken);
  const loadId = uuid();
  yield put(
    addLoader({
      id: loadId,
      message: 'Please wait, day off are deleting!',
      type: LoaderAction.schedule.deleteDayOff,
    }),
  );
  try {
    if (!accessToken) throw new Error('Not authorized');
    const res = yield ScheduleAPI.deleteDayOff(payload, accessToken);
    if (!res && res.code) {
      yield put(
        deleteDayOffAction.failure({
          code: res.code,
          message: res.message || 'Something was wrong',
        }),
      );
      yield put(
        addError({
          id: loadId,
          message: 'Failed to delete day off!',
          type: LoaderAction.schedule.deleteDayOff,
        }),
      );
    } else {
      yield put(
        deleteDayOffAction.success({
          response: res,
          additionalFields: payload,
        }),
      );
      yield put(
        removeLoader({
          id: loadId,
        }),
      );
    }
  } catch (error) {
    console.error('error: ', error);
    yield put(
      deleteDayOffAction.failure({
        code: error.code || 400,
        message: error.message || error || 'Something was wrong',
      }),
    );
    yield put(
      addError({
        id: loadId,
        message: 'Failed to delete day off!',
        type: LoaderAction.schedule.deleteDayOff,
      }),
    );
  }
}

export function* scheduleActionSaga() {
  yield all([
    takeEvery(getDaysOffAction.request, getDaysOffSaga),
    takeEvery(deleteDayOffAction.request, deleteDayOffSaga),
    takeEvery(setDayOffAction.request, setDayOffSaga),
    takeEvery(getScheduleAction.request, getScheduleSaga),
    takeEvery(
      getUncompletedTimeSlotsAction.request,
      getUncompletedTimeSlotsSaga,
    ),
  ]);
}
