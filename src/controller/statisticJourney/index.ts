import { ActionType, createReducer } from 'typesafe-actions';
// actions
import * as actions from './actions';
// interfaces
import { IJourneyStatistic, IStatisticState } from './models';

//Sagas
import { IStore } from '@app/controller/model';
import { getJourneyStatisticAction } from './actions';
import { IModuleState } from '@app/controller/module/models';

export type AuthActionType = ActionType<typeof actions>;

const initialState: IStatisticState = {
  state: {
    loaders: [],
    errors: [],
  },
  journeys: {},
};

export const statisticByJourneyReducer = createReducer<
  IStatisticState,
  AuthActionType
>(initialState)
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

export const getStatisticByJourney = (
  state: IStore,
): IStatisticState['journeys'] => state.statisticByJourneyReducer.journeys;
