// enum
import { TimezoneTypeEnum } from '@ternala/frasier-types/lib/constants/main';

export interface IData {
  name: string;
  details: IItem[];
}

export interface IItem {
  name: string;
  subname?: string;
  isRequired: boolean;
  isSelect?: boolean;
  isEmail?: boolean;
  default?: number;
}

export interface IZones {
  offset: string;
  name: string;
}

export interface IZonesModified {
  offset: string;
  subname: TimezoneTypeEnum;
  name: string;
}

export interface IListSocial {
  name: string;
}

export interface IListSocialState {
  name: string;
  isLinked: boolean;
}

export interface IFullObjectState {
  city: string | null;
  email: string | null;
  firstName: string | null;
  image: string | null;
  lastName: string | null;
  phone: string | null;
  startTime: string | null;
  state: string | null;
  street: string | null;
  timezone: string | null;
  zipCode: string | null;
}

export interface IboolState {
  city: boolean;
  email: boolean;
  firstName: boolean;
  image: boolean;
  lastName: boolean;
  phone: boolean;
  startTime: boolean;
  state: boolean;
  street: boolean;
  timezone: boolean;
  zipCode: boolean;
}
