export interface IName {
  name: string;
  surname: string;
}

export interface IModule {
  title: string;
  ends: string;
  hoursSpent: number;
  hours?: number;
  color?: string;
}

export interface IModuleProgress {
  hoursGeneral: number;
  hoursSpent: number;
  tasksGeneral: number;
  tasksDone: number;
}

export interface IListItemCompleted {
  title: string;
  percentageOfTasks: number;
  days: number;
  hours: number;
  startedAt: string;
  endedAt: string;
}
