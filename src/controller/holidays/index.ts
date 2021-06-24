import { ActionType, createReducer } from 'typesafe-actions';
import { all } from 'redux-saga/effects';
// actions
import * as actions from './actions';

// interfaces
import { IHolidayState, ILoader } from './models';

//Sagas
import { getHolidayDataSaga } from './sagas/holidaySaga';
import * as action from './actions';
import { IStore } from '../model';
import { DayOffDTO, HolidayDTO } from '@ternala/frasier-types';

export const HolidaySaga = function* () {
  yield all([getHolidayDataSaga()]);
};

const initialState: IHolidayState = {
  holidays: [],
  Loader: {
    isLoading: false,
  },
};

export type HolidayActionType = ActionType<typeof action>;

export const GetHolidayReducer = createReducer<
  IHolidayState,
  HolidayActionType
>(initialState)
  .handleAction(
    actions.LoaderAction,
    (state: IHolidayState, { payload }): IHolidayState => ({
      ...state,
      Loader: {
        isLoading: payload.isLoading,
      },
    }),
  )
  .handleAction(
    [actions.getHolidayDataAction.success],
    (state: IHolidayState, { payload }): IHolidayState => ({
      ...state,
      holidays: payload.items,
    }),
  )
  .handleAction(
    [actions.deleteHolidayDataAction.success],
    (state: IHolidayState, { payload }): IHolidayState => ({
      ...state,
      holidays: state.holidays.filter(
        (holiday) => holiday.id !== payload.additionalFields.holiday,
      ),
    }),
  )
  .handleAction(
    [actions.getHolidayDataAction.failure],
    (state: IHolidayState, { payload }): IHolidayState => ({
      ...state,
      ...payload,
    }),
  );

export const getHolidays = (state: IStore): HolidayDTO[] =>
  state.HolidayReducer.holidays;
export const getHolidayLoader = (state: IStore): ILoader =>
  state.HolidayReducer.Loader;
