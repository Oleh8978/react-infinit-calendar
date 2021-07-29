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
import { ITipsState } from '@app/controller/Tips/models';
import { INotificationState } from '@app/controller/notifications/models';
import { INotesState } from '@app/controller/notes/models';
import { INoteState } from '@app/controller/singleNote/models';
import {
  IStaticPageState,
  IPagesSate,
} from '@app/controller/staticPage/models';
import { ISaveBTNState } from '@app/controller/saveBTN/models';
import { INoteSend } from '@app/controller/sendNoteReducer/models';
import { IModalWindowState } from '@app/controller/modalWindowReducer/models';
import { INotePrevState } from '@app/controller/previouseNoteText/model';
import { INotePrevStateModule } from '@app/controller/previouseNoteTextModule/model';
import { IArticleListState } from '@app/controller/articles/models';
import { IExpertsState } from '@app/controller/experts/models';
import { ISelectedExpert } from '@app/controller/selectedExpert/models';
import { IExpertState } from '@app/controller/expert/models';

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
  tipsListReducer: ITipsState;
  notififcationReducer: INotificationState;
  notesListReducer: INotesState;
  singleNoteReducer: INoteState;
  staticPageReducer: IPagesSate;
  staticPagesListReducer: IStaticPageState;
  saveBtnReducer: ISaveBTNState;
  noteLocalDataCollectorReducer: INoteSend;
  ModalWindowReducer: IModalWindowState;
  notePrevStateReducer: INotePrevState;
  notePrevStateReducerModule: INotePrevStateModule;
  articleListReducer: IArticleListState;
  expertListReducer: IExpertsState;
  ExpertSelectedStateReducer: ISelectedExpert;
  SingleExpertReducer: IExpertState;
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
export type LoaderActionType =
  | PayloadAction<string, ILoader>
  | PayloadAction<string, IError & { id: string }>
  | PayloadAction<string, { id: string }>
  | PayloadAction<string, { target: string }>;
