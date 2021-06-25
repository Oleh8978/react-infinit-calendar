export interface IErrorState {
  error: string;
  name: string;
  code: string;
}

export interface ILoaderState {
  status: boolean;
}

/// STATISTICS LIST

export interface IStatisticsListState {
  journeyObject: IJourneyObject;
  loaderState: ILoaderState;
  errorState: IErrorState;
}

export interface IJourneyObject {
  journeys: IJourney[];
}

export interface IJourney {
  id: number;
  title: string;
  subTitle: string;
  accentColor: string;
  image: string;
  workDays: number;
  trialPeriod: number;
  price: number;
  createdAt: string;
  statistic: IStatistic;
}

export interface IStatistic {
  spent: number;
  maxSpent?: number;
  completedTaskCount: number;
  maxTaskCount: number;
  minDaySpent?: number;
  maxDaySpent: number;
  endDate: string;
  isCompleted: boolean;
  startDate: string;
}
