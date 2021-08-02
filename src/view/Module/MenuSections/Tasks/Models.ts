export interface ICalendarData {
  time: string;
  tasks: IListCalendarItem[];
}

export interface IListCalendarItem {
  time: string;
  timeToDo: number;
  items: ITask[];
}

export interface ITask {
  id: number;
  title: string;
  isChecked: boolean;
  text: string;
}

export interface IDayHaseAnyEvents {
  time: string;
  hasAnyevents: boolean;
}
