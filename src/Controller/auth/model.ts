import { DevicePlatformEnum } from '@ternala/frasier-types';
import { UserDTO } from '@ternala/frasier-types/lib/modules/user/user.dto';

// Configs
import { loginType } from 'Config';
import { IState } from '../model';

export interface IAuthState {
  account?: UserDTO;
  error?: IAuthException;
  token?: string;
  authData?: IAuthData;
  isAuthenticated?: boolean;
  state: IState;
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

export interface ISignIn {
  login: string;
  password: string;
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
