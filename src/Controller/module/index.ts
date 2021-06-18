import { all } from 'redux-saga/effects';
import { createReducer, ActionType } from 'typesafe-actions';
import { timeSlotDateFormat } from '@ternala/frasier-types/lib/constants';
import moment from 'moment';
import { omit } from 'lodash';

// Actions
import * as actions from './actions';
import { generateLoaderActions } from '../based';

// Interfaces
import { IModuleState } from './models';
import { LoaderActionType, IStore } from '../model';

// Sagas
import { moduleActionSaga } from './sagas/module';
import { ILoader } from '../../Model';

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
  )
  .handleAction(
    actions.toggleExecuteTaskAction.success,
    (state: IModuleState, { payload }): IModuleState => {
      if (payload.additionalFields.module) {
        const uncompleted =
          state.moduleData[payload.additionalFields.module]
            .uncompletedTimeSlotData;
        const full =
          state.moduleData[payload.additionalFields.module].timeSlotData;
        if (uncompleted) {
          const day =
            uncompleted[
              moment(payload.additionalFields.purposeDate).format(timeSlotDateFormat)
            ];
          if (day) {
            uncompleted[
              moment(payload.additionalFields.purposeDate).format(timeSlotDateFormat)
            ] = day
              ?.map((timeSlot) => {
                if (timeSlot.id === payload.additionalFields.timeSlot) {
                  let tasks = timeSlot.tasks;
                  if (payload.additionalFields.action === 'create') {
                    tasks = tasks.filter(
                      (task) => task.id !== payload.response.task.id,
                    );
                  } else {
                    tasks = [
                      ...(timeSlot.tasks || []),
                      {
                        ...payload.response.task,
                        executions: [],
                        sections: [],
                      },
                    ];
                  }
                  if (tasks?.length) {
                    return {
                      ...timeSlot,
                      tasks,
                    };
                  }
                  return undefined;
                }
                return timeSlot;
              })
              .filter(Boolean);
          }
        }
        if (full) {
          const day =
            full[
              moment(payload.additionalFields.purposeDate).format(timeSlotDateFormat)
            ];
          if (day) {
            full[
              moment(payload.additionalFields.purposeDate).format(timeSlotDateFormat)
            ] = day.map((timeSlot) => {
              let tasks = timeSlot.tasks;
              if (timeSlot.id === payload.additionalFields.timeSlot) {
                tasks = tasks.map((task) => {
                  if (task.id === payload.additionalFields.task) {
                    if (payload.additionalFields.action === 'create') {
                      return {
                        ...task,
                        executions: [omit(payload.response, ['task', 'user'])],
                      };
                    }
                    return {
                      ...task,
                      executions: [],
                    };
                  } else {
                    return task;
                  }
                });
              }
              return {
                ...timeSlot,
                tasks,
              };
            });
          }
        }

        return {
          ...state,
          moduleData: {
            ...state.moduleData,
            [payload.additionalFields.module]: {
              ...state.moduleData[payload.additionalFields.module],
              uncompletedTimeSlotData: {
                ...uncompleted,
              },
              timeSlotData: {
                ...full,
              },
            },
          },
        };
      }
      return state;
    },
  );

export const addLoader = loaderActions.actions.addLoader;
export const addError = loaderActions.actions.addError;
export const removeError = loaderActions.actions.removeError;
export const removeLoader = loaderActions.actions.removeLoader;

export const getModules = (state: IStore): IModuleState['moduleData'] =>
  state.moduleState.moduleData;
export const getLoader = (state: IStore): ILoader[] =>
  state.moduleState.state.loaders;
