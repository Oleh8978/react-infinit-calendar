export interface ICalendarData {
  time: string;
  tasks: IListCalendarItem[];
}

export interface IListCalendarItem {
  time: string;
  timeToDo: number;
  items: ITask[]
}

export interface ITask {
  title: string;
  isChecked: boolean;
  text: string;
}
