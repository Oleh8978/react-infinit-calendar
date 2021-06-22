export interface IListItem {
  id: number;
  data: string;
  title: string;
  subtitle: string;
  text?: string;
  list?: IItem[];
}

export interface IItem {
  text: string;
}
