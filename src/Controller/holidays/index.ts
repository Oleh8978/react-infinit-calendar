import { ActionType, createReducer } from 'typesafe-actions';
import { all } from 'redux-saga/effects';
// actions
import * as actions from './actions';

// interfaces
import { IHolidayState } from './models';

//Sagas
import { getHolidayDataSaga } from './sagas/holidaySaga';
import * as action from './actions';
import { HolidayGetListResponse } from '@ternala/frasier-types';


export const HolidaySaga = function* () {
  yield all([getHolidayDataSaga()]);
};

const initialState: IHolidayState = {
  holidayObject: {
    items: [],
    counts: 0,
  },
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
      holidayObject: {...payload},
    }),
  )
  .handleAction(
    [actions.getHolidayDataAction.failure],
    (state: IHolidayState, { payload }): IHolidayState => ({
      ...state,
      ...payload,
    }),
  );
