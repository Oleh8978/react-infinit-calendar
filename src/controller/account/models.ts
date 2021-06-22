import {} from '@ternala/frasier-types';

export interface IException {
  code: string;
  message: string;
  name: string;
}

export interface IAccountState {
  user: IUser;
  isLoading: {
    status: boolean;
  };
  exceptions: IException;
}

export interface IUser {
  id: number;
  isCanSendEmail: boolean;
  isCanSendPush: boolean;
  isNeedSecondStep: boolean;
  journeyConnections: IJourneyConnections[];
  userData: IUserData;
}

export interface IUserData {
  firstName?: string;
  image?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface IJourneyConnections {
  id?: number;
  isPaid?: boolean;
  startDate?: Date | string;
  createdAt?: Date | string;
}

export interface ISetLoadingAction {
  status: boolean;
}
