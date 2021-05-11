export interface ISetting {
  icon: string;
  name: string;
  items: ISettingElem[];
}

export interface ISettingElem {
  name: string;
  button?: string;
}
