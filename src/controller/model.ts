import { PayloadAction } from 'typesafe-actions/dist/type-helpers';
import { RouterState } from 'connected-react-router';

import { IError, ILoader } from '../model';
import { IAuthState } from './auth/model';
import { IUpdateState } from './secondStepDataUpdater/models';
import { IScheduleState } from './schedule/models';
import { IModuleState } from './module/models';
import { IDiscoveryState } from './Discovery/model';
import { IAcrticleCategoryState } from './articleCategory/models';
import { IHolidayState } from './holidays/models';
import { IAccountState } from './account/models';
import { IStatisticsState } from './statistic/models';
import { IStatisticsListState } from './statisticList/models';
import { IJourneyState } from '@app/controller/journey/models';
import { StatisticGetJourneyResponse } from '@ternala/frasier-types';
import { statisticByJourneyReducer } from '@app/controller/statisticJourney';
import { IStatisticState } from '@app/controller/statisticJourney/models';

export interface IStore {
  router: RouterState;
  authState: IAuthState;
  app: IState;
  scheduleState: IScheduleState;
  moduleState: IModuleState;
  updateSteUserAfterSignIn: IUpdateState;
  discoveryListReducer: IDiscoveryState;
  ArticleReducer: IAcrticleCategoryState;
  userReducer: IAccountState;
  HolidayReducer: IHolidayState;
  statisticReducer: IStatisticsState;
  statisticByJourneyReducer: IStatisticState;
  statisticListReducer: IStatisticsListState;
  JourneyReducer: IJourneyState;
}

export interface ISimpleState {
  code?: number;
  isLoading: boolean;
  message?: string;
  error?: boolean;
}

export interface IException {
  code: string;
  message: string;
  name?: string;
}

export interface IState {
  loaders?: ILoader[];
  errors?: IError[];
}
export type LoaderActionType = PayloadAction<string, ILoader> | PayloadAction<string, IError & { id: string }> | PayloadAction<string, { id: string }> | PayloadAction<string, { target: string }>;
