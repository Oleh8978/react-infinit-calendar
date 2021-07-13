export interface INotificationObject {
  isCanSendEmail: boolean;
  isCanSendSMS: boolean;
}

export interface INotificationRequest {
  notifications: INotificationObject;
  accessToken: string;
}

export interface IloaderState {
  status: boolean;
  isAnyError: boolean;
  error: string;
}

export interface INotificationState {
  notifications: INotificationObject;
  loader: IloaderState;
}
