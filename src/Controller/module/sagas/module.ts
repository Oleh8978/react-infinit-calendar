import { all, put, takeEvery, select } from 'redux-saga/effects';
import {
  getScheduleAction,
  getUncompletedTimeSlotsAction,
  getModuleAction,
} from '../actions';
import { getAccessToken } from '../../auth';
import uuid from '../../../Utils/uuid';
import { addError, addLoader, removeLoader } from '../index';
import { LoaderAction } from 'Config/constants';
import { ModuleApi } from '../transport/module.api';

export function* getModuleSaga({
  payload,
}: ReturnType<typeof getModuleAction.request>) {
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
    const res = yield ModuleApi.getModule(payload, accessToken);
    if (!res && res.code) {
      yield put(
        getModuleAction.failure({
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
        getModuleAction.success({
          response: res,
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
      getModuleAction.failure({
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
    const res = yield ModuleApi.getTimeSlots(payload, accessToken);
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
      yield put(
        removeLoader({
          id: loadId,
        }),
      );
    }
  } catch (error) {
    console.error('error: ', error);
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
    const res = yield ModuleApi.getUncompletedTimeSlots(payload, accessToken);
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

export function* moduleActionSaga() {
  yield all([
    takeEvery(getScheduleAction.request, getScheduleSaga),
    takeEvery(getModuleAction.request, getModuleSaga),
    takeEvery(
      getUncompletedTimeSlotsAction.request,
      getUncompletedTimeSlotsSaga,
    ),
  ]);
}
