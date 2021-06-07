import { DevicePlatformEnum } from '@ternala/frasier-types';
import { UserDTO } from '@ternala/frasier-types';

// Configs
import { loginType } from 'Config';
import { IState } from '../model';

export interface IAuthState {
  account?: UserDTO;
  error?: IAuthException;
  token?: string;
  accessToken: accessTokenType;
  refreshToken: refreshTokenType;
  isAuthenticated?: boolean;
  isAllfiealdsFilledOut?: boolean | string ,
  state?: IloaderState;
  deviceCredentials?: IDeviceCredentials;
}

export type accessTokenType = string;
export type refreshTokenType = string;

export interface IAuthException {
  code: string;
  message: string;
  name: string;
}

export interface ISetAuthenticatedStatus {
  status: boolean;
}

export interface ISignedData {
  id?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  picture?: string;
  email?: string;
  type: loginType;
  accessToken?: string;
  expiresIn?: number;

  FCMToken?: string;
  platform?: DevicePlatformEnum;
}

export interface IAuthData {
  accessToken: accessTokenType;
  refreshToken: refreshTokenType;
}

export interface ISignInByToken {
  accessToken: accessTokenType;
}

export interface IRefreshToken {
  refreshToken: refreshTokenType;
}


export interface IDeviceCredentials {
  FCMToken?: string;
  platform: DevicePlatformEnum | null;
  fingerprint: string;
}

export interface ISignInData {
  signIntype: string;
  receivedToken: string;
}

export interface IRespond {
  accessToken: string;
  refreshToken: string;
  userData?: IuserData;
}

export interface IuserData {
  city?: string | null | any;
  email?: string;
  firstName?: string;
  id?: number;
  image?: string;
  lastName?: string;
  phone?: string | any | null;
  startTime?: number;
  state?: string | any | null;
  street?: string | any | null;
  timezone?: string;
  zipCode?: string | any | null;
}

export interface ISignInInterface  {
  receivedToken: string;
  signIntype: string;
}

export  interface IloaderState {
  code?: number | undefined;
  message?: string;
  isLoading: boolean;
  error?: boolean;
}
