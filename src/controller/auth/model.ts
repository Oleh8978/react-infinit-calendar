import { DevicePlatformEnum } from '@ternala/frasier-types';
import { UserDTO, AuthUserResponseDTO } from '@ternala/frasier-types';

// Configs
import { loginType } from '@app/config';
import { IState } from '../model';

export interface IAuthState {
  error?: IAuthException;
  accessToken: accessTokenType;
  refreshToken: refreshTokenType;
  user?: IUser;
  isAuthenticated?: boolean;
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

export interface IIsNeedSecondStep {
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

export interface ISignInInterface {
  receivedToken: string;
  signIntype: string;
}

export interface IloaderState {
  code?: number | undefined;
  message?: string;
  isLoading: boolean;
  error?: boolean;
}

export interface IUser {
  createdAt?: string;
  id?: number;
  isCanSendEmail?: boolean;
  isCanSendPush?: boolean;
  isNeedSecondStep?: boolean;
  userData?: IUserData;
}

export interface IUserData {
  city?: null | string;
  deletedAt?: null | string;
  email?: string;
  firstName?: string;
  id?: number;
  image?: string | any | IUserData;
  lastName?: string;
  phone?: null | string;
  startTime?: number | null;
  state?: null | string;
  street?: null | string;
  timezone?: null | string;
  zipCode?: null | string | number;
}
