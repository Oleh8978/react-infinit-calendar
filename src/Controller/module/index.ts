import { all } from 'redux-saga/effects';
import { createReducer, ActionType } from 'typesafe-actions';

// Actions
import * as actions from './actions';
import { generateLoaderActions } from '../based';

// Interfaces
import { IModuleState } from './models';
import { LoaderActionType, IStore } from '../model';

// Sagas
import { moduleActionSaga } from './sagas/module';

export type ModuleActionType = ActionType<typeof actions>;
type ActionTypes = ModuleActionType | LoaderActionType;

export const moduleSaga = function* () {
  yield all([moduleActionSaga()]);
};

const loaderActions = generateLoaderActions<IModuleState, ActionTypes>(
  actions.widgetName,
);

export const loaderHandlers = loaderActions.handlers;

const initialState: IModuleState = {
  state: {
    loaders: [],
    errors: [],
  },
  moduleData: {},
};

export const moduleReducer = createReducer<IModuleState, ActionTypes>(
  initialState,
  loaderHandlers,
)
  .handleAction(
    actions.getModuleAction.success,
    (state: IModuleState, { payload }): IModuleState => ({
      ...state,
      moduleData: {
        ...state.moduleData,
        [payload.response.id]: {
          ...state.moduleData[payload.response.id],
          ...payload.response,
        },
      },
    }),
  )
  .handleAction(
    actions.getScheduleAction.success,
    (state: IModuleState, { payload }): IModuleState => ({
      ...state,
      moduleData: {
        ...state.moduleData,
        [payload.searchParams.module]: {
          ...state.moduleData[payload.searchParams.module],
          timeSlotData: payload.response.days,
        },
      },
    }),
  )
  .handleAction(
    actions.getUncompletedTimeSlotsAction.success,
    (state: IModuleState, { payload }): IModuleState => ({
      ...state,
      moduleData: {
        ...state.moduleData,
        ...(payload.searchParams.module
          ? {
              [payload.searchParams.module]: {
                ...state.moduleData[payload.searchParams.module],
                uncompletedTimeSlotData: payload.response.days,
              },
            }
          : {}),
      },
    }),
  );

export const addLoader = loaderActions.actions.addLoader;
export const addError = loaderActions.actions.addError;
export const removeError = loaderActions.actions.removeError;
export const removeLoader = loaderActions.actions.removeLoader;

export const getModules = (state: IStore): IModuleState['moduleData'] =>
  state.moduleState.moduleData;