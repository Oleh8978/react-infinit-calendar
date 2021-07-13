import { all } from 'redux-saga/effects';
import { createReducer, ActionType } from 'typesafe-actions';

// Actions
import * as actions from './actions';

// interfaces
import { INotificationState } from './models';

export type notificationActionType = ActionType<typeof actions>;

/* Reducer */
const initialState: INotificationState = {
  notifications: {
    isCanSendEmail: false,
    isCanSendSMS: false,
  },
  loader: {
    status: false,
    isAnyError: false,
    error: '',
  },
};

export const notififcationReducer = createReducer<
  INotificationState,
  notificationActionType
>(initialState)
  .handleAction(actions.setLoadingAction, (store, { payload }) => ({
    ...store,
    loader: { ...payload },
  }))
  .handleAction(
    [actions.patchNotificationAction.success],
    (state: INotificationState, { payload }): INotificationState => ({
      notifications: {
        isCanSendEmail: payload.notifications.isCanSendEmail,
        isCanSendSMS: payload.notifications.isCanSendSMS,
      },
      loader: {
        status: false,
        isAnyError: false,
        error: '',
      },
    }),
  )
  .handleAction(
    [actions.patchNotificationAction.failure],
    (state: INotificationState): INotificationState => ({
      ...state,
      notifications: {
        isCanSendEmail: state.notifications.isCanSendEmail,
        isCanSendSMS: state.notifications.isCanSendSMS,
      },
      loader: {
        status: false,
        isAnyError: true,
        error: state.loader.error,
      },
    }),
  );
