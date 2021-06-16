import { all } from 'redux-saga/effects';
import { createReducer, ActionType } from 'typesafe-actions';

// Actions
import * as actions from './actions';
import { generateLoaderActions } from '../based';

// Interfaces
import { IScheduleState } from './models';
import { LoaderActionType, IStore } from '../model';

// Sagas
import {
  getUncompletedTimeSlotsSaga,
  scheduleActionSaga,
} from './sagas/schedule';
import { IAuthState } from '../auth/model';
import { IDayWithTimeSlots } from '@ternala/frasier-types';

export type ScheduleActionType = ActionType<typeof actions>;
type ActionTypes = ScheduleActionType | LoaderActionType;

export const scheduleSaga = function* () {
  yield all([scheduleActionSaga()]);
};

const loaderActions = generateLoaderActions<IScheduleState, ActionTypes>(
  actions.widgetName,
);

export const loaderHandlers = loaderActions.handlers;

const initialState: IScheduleState = {
  state: {
    loaders: [],
    errors: [],
  },
  storedSearchParams: null,
  timeSlotData: {},
  uncompletedTimeSlotData: {},
};

export const scheduleReducer = createReducer<IScheduleState, ActionTypes>(
  initialState,
  loaderHandlers,
)
  .handleAction(
    actions.getUncompletedTimeSlotsAction.success,
    (state: IScheduleState, { payload }): IScheduleState => ({
      ...state,
      uncompletedTimeSlotData: payload.response.days,
    }),
  )
  .handleAction(
    actions.getScheduleAction.success,
    (state: IScheduleState, { payload }): IScheduleState => ({
      ...state,
      timeSlotData: payload.response.days,
    }),
  );

export const addLoader = loaderActions.actions.addLoader;
export const addError = loaderActions.actions.addError;
export const removeError = loaderActions.actions.removeError;
export const removeLoader = loaderActions.actions.removeLoader;

export const getSchedule = (state: IStore): IDayWithTimeSlots =>
  state.scheduleState.timeSlotData;
export const getUncompleted = (state: IStore): IDayWithTimeSlots =>
  state.scheduleState.uncompletedTimeSlotData;
