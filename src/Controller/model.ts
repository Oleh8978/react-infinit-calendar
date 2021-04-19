import { PayloadAction } from "typesafe-actions/dist/type-helpers";
import { RouterState } from 'connected-react-router';

import { IError, ILoader } from '../Model';
import { IAuthState } from './auth/model';

export interface IStore {
  router: RouterState;
  authState: IAuthState;
  app: IState;
}

export interface ISimpleState {
  code?: number;
  isLoading: boolean;
  message?: string;
  error?: boolean;
}

export interface IException {
  code: string;
  message: string;
  name?: string;
}

export interface IState {
  loaders: ILoader[];
  errors: IError[];
}
