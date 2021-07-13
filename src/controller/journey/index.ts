import { ActionType, createReducer } from 'typesafe-actions';
import { all } from 'redux-saga/effects';
// actions
import * as actions from './actions';

// interfaces
import { IJourneyState, ILoader } from './models';

//Sagas
import * as action from './actions';
import { IStore } from '../model';
import { getJourneyDataSaga } from '@app/controller/journey/sagas/journeySaga';
import { DayOffDTO, JourneyDTO, JourneyGetResponse } from '@ternala/frasier-types';
import { JourneyUserConnectShortDTO } from '@ternala/frasier-types/lib/modules/journey/userConnect';
import { SectionShortDTO } from '@ternala/frasier-types/lib/modules/section';
import { TimeSlotShortDTO } from '@ternala/frasier-types/lib/modules/timeSlot';
import { ModuleShortDTO } from '@ternala/frasier-types/lib/modules/module';
import { IScheduleState } from '@app/controller/schedule/models';
import { concatWithUnique } from '@app/utils/concatWithUnique';
import { deleteJourneyConnectAction, setJourneyConnectAction } from './actions';

export const JourneySaga = function* () {
  yield all([getJourneyDataSaga()]);
};

const initialState: IJourneyState = {
  journey: {
    id: 0,
    title: '',
    subTitle: '',
    image: '',
    workDays: [],
    createdAt: new Date(),
    isNeedPaid: false,
    startShowingDate: new Date(),
    userConnections: [],
    sections: [],
    timeSlots: [],
    modules: [],
  },
  Loader: {
    isLoading: false,
  },
};

export type JourneyActionType = ActionType<typeof action>;

export const GetJourneyReducer = createReducer<
  IJourneyState,
  JourneyActionType
  >(initialState)
  .handleAction(
    actions.LoaderAction,
    (state: IJourneyState, { payload }): IJourneyState => ({
      ...state,
      Loader: {
        isLoading: payload.isLoading,
      },
    }),
  )
  .handleAction(
    [actions.getJourneyDataAction.success],
    (state: IJourneyState, { payload }): IJourneyState => ({
      ...state,
      journey: payload,
    }),
  )
  .handleAction(
    [actions.setJourneyConnectAction.success],
    (state: IJourneyState, { payload }): IJourneyState => ({
      ...state,
      journey: payload.response,
    }),
  )
  .handleAction(
    [actions.deleteJourneyConnectAction.success],
    (state: IJourneyState, { payload }): IJourneyState => ({
      ...state,
      journey: {
        ...state.journey,
        status: {
          ...state.journey.status,
          isConnected: false,
        }
      }
    }),
  )
  .handleAction(
    [actions.getJourneyDataAction.failure],
    (state: IJourneyState, { payload }): IJourneyState => ({
      ...state,
      ...payload,
    }),
  );

export const getJourney = (state: IStore): JourneyGetResponse =>
  state.JourneyReducer.journey;
export const getJourneyLoader = (state: IStore): ILoader =>
  state.JourneyReducer.Loader;
