import { DevicePlatformEnum } from '@ternala/frasier-types';

// Configs
import { loginType } from 'Config';
import { IState } from '../model';

export interface IAuthState {
  error?: IAuthException;
  token?: string;
  isAuthenticated?: boolean;
  state: IState;
}

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
