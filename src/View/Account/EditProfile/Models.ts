export interface IData {
  name: string;
  details: IItem[];
}

export interface IItem {
  name: string;
  isRequired: boolean;
  isSelect?: boolean;
  isEmail?: boolean;
  default?: string;
}

export interface IZones {
  offset: string;
  name: string;
}

export interface IListSocial {
  name: string;
}

export interface IListSocialState {
  name: string;
  isLinked: boolean;
}
