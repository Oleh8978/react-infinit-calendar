export interface IException {
  code: string | null;
  message: string | null;
  name: string | null;
}

export interface IUpdateState {
  userData: IUserDataExtended;
  loaderState: ILoaderState;
  isSecondStepPassed: boolean;
}

export interface IUserDataExtended {
  firstName?: string | null;
  lastName?: string | null;
  image?: string | null;
  email?: string | null;
  phone?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  timezone?: string | null;
  startTime?: number | null;
  user: number | null;
  id: number | null;
}

export interface IIsSecondStepPassed {
  isSecondStepPassed: boolean;
}

export interface ILoaderState {
  status: boolean;
  code: string;
  message: string;
}
