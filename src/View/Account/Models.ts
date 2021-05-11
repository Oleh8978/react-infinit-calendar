export interface IName {
  name: string;
  surname: string;
}

export interface IModule {
  title: string;
  ends: string;
  hoursSpent: number;
  hours?: number;
}

export interface IListItemCompleted {
  title: string;
  percentageOfTasks: number;
  days: number;
  hours: number;
  startedAt: string;
  endedAt: string;
}
