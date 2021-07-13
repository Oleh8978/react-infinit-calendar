import { all, put, takeEvery, select } from 'redux-saga/effects';

//APIs
import { notificationAPI } from '../transport/notifications.api';

// Actions
import * as action from '../actions';

export function* putchNotificationSaga({
  payload,
}: ReturnType<typeof action.patchNotificationAction.request>) {
  yield put(
    action.setLoadingAction({
      status: true,
      isAnyError: false,
      error: '',
    }),
  );

  try {
    const resp = yield notificationAPI.patchNotification(
      payload.accessToken,
      payload.notifications.isCanSendEmail,
      payload.notifications.isCanSendSMS,
    );
    if (resp === true) {
      yield put(
        action.patchNotificationAction.success({
          ...payload,
        }),
      );
      yield put(
        action.setLoadingAction({
          status: false,
          isAnyError: false,
          error: '',
        }),
      );
    }
  } catch (error) {
    console.log('SUBMIT QUESTION ERROR: ', error);
    yield put(
      action.setLoadingAction({
        status: false,
        isAnyError: true,
        error: `The erorr happend after loading ${error}`,
      }),
    );
  }
}

export function* patchNotificaionSaga() {
  yield all([
    takeEvery(action.patchNotificationAction.request, putchNotificationSaga),
  ]);
}
