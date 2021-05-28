export interface IData {
  name: string;
  details: IItem[];
}

export interface IItem {
  name: string;
  isRequired: boolean;
}

export interface IListSocial {
  name: string;
}

export interface IListSocialState {
  name: string;
  isLinked: boolean;
}
