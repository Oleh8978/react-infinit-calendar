import { PayloadAction } from 'typesafe-actions/dist/type-helpers';
import { RouterState } from 'connected-react-router';

import { IError, ILoader } from '../Model';
import { IAuthState } from './auth/model';
import { IUpdateState } from './secondStepDataUpdater/models';
import { IDiscoveryState } from './Discovery/model';
import { IAcrticleCategoryState } from './articleCategory/models';
import { IAccountState } from './account/models';
import { IStatisticsState } from './statistic/models';
import { IStatisticsListState } from './statisticList/models';

export interface IStore {
  router: RouterState;
  authState: IAuthState;
  app: IState;
  updateSteUserAfterSignIn: IUpdateState;
  discoveryListReducer: IDiscoveryState;
  ArticleReducer: IAcrticleCategoryState;
  userReducer: IAccountState;
  statisticReducer: IStatisticsState;
  statisticListReducer: IStatisticsListState;
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
