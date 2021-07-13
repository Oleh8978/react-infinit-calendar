// types
import Pages from '@app/routing/schema';

export interface ISetting {
  icon?: string;
  name?: string;
  items: ISettingElem[];
}

export interface ISettingElem {
  name: string;
  button?: string;
  subname?: string;
  link?: any;
}
