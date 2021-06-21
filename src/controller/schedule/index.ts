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
import { DayOffDTO, IDayWithTimeSlots } from '@ternala/frasier-types';
import { concatWithUnique } from 'utils/concatWithUnique';

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
  daysOff: [],
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
  )
  .handleAction(
    actions.getDaysOffAction.success,
    (state: IScheduleState, { payload }): IScheduleState => ({
      ...state,
      daysOff: concatWithUnique<DayOffDTO>(
        state.daysOff,
        payload.response.items,
        'id',
        false,
      ),
    }),
  )
  .handleAction(
    actions.setDayOffAction.success,
    (state: IScheduleState, { payload }): IScheduleState => ({
      ...state,
      daysOff: concatWithUnique<DayOffDTO>(
        state.daysOff,
        [payload.response],
        'id',
        false,
      ),
    }),
  )
  .handleAction(
    actions.deleteDayOffAction.success,
    (state: IScheduleState, { payload }): IScheduleState => ({
      ...state,
      daysOff: state.daysOff.filter(
        (item) => payload.additionalFields.ids.indexOf(item.id) === -1,
      ),
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
export const getDaysOff = (state: IStore): DayOffDTO[] =>
  state.scheduleState.daysOff;