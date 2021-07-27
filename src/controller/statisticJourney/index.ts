import { ActionType, createReducer } from 'typesafe-actions';
// actions
import * as actions from './actions';
import { getJourneyStatisticAction } from './actions';
import { generateLoaderActions } from '@app/controller/based';

// interfaces
import { IStatisticState } from './models';

//Sagas
import { IStore, LoaderActionType } from '@app/controller/model';
import { ILoader } from '@app/model';

export type StatisticByJourneyActionType = ActionType<typeof actions>;
type ActionTypes = StatisticByJourneyActionType | LoaderActionType;

const loaderActions = generateLoaderActions<IStatisticState, ActionTypes>(
  actions.widgetName,
);

export const loaderHandlersForStatistics = loaderActions.handlers;

const initialState: IStatisticState = {
  state: {
    loaders: [],
    errors: [],
  },
  journeys: {},
};

export const statisticByJourneyReducer = createReducer<IStatisticState, ActionTypes>(
  initialState,
  loaderHandlersForStatistics,
)
.handleAction(
    actions.getJourneyStatisticAction.success,
    (state: IStatisticState, { payload }): IStatisticState => ({
      ...state,
      journeys: {
        ...state.journeys,
        [payload.response.journey.id]: {
          statistic: payload.response.journey.statistic,
          modules: payload.response.modules,
        },
      },
    }),
  )
  .handleAction(
    [getJourneyStatisticAction.failure],
    (state: IStatisticState, { payload }): IStatisticState => ({
      ...state,
      ...payload,
    }),
  );

export const addLoader = loaderActions.actions.addLoader;
export const addError = loaderActions.actions.addError;
export const removeError = loaderActions.actions.removeError;
export const removeLoader = loaderActions.actions.removeLoader;

export const getStatisticByJourney = (state: IStore): IStatisticState['journeys'] =>
  state.statisticByJourneyReducer.journeys;
export const getLoader = (state: IStore): ILoader[] =>
  state.statisticByJourneyReducer.state.loaders;
