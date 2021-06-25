import { StatisticByDayRequest } from '@ternala/frasier-types';

export interface IStatisticsState {
  statisticToday?: IstatisticToday | any;
  errorState?: IErrorState;
  loaderState: ILoaderState;
}

export interface IstatisticToday {
  spent: number;
  maxSpent: number;
  completedTaskCount: number;
  maxTaskCount: number;
}

export interface IErrorState {
  error: string;
  name: string;
  code: string;
}

export interface ILoaderState {
  status: boolean;
}