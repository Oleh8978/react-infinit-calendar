export interface IfaqState {
  data: IsubmitData;
  loader: IloaderState;
}

export interface IsubmitData {
  categoryID: string;
  description: string;
}

export interface IsubmitDataRequest {
  receivedToken: string;
  categoryID: string;
  description: string;
}

export interface IloaderState {
  isLoading: boolean;
  isError: boolean;
  error: string;
}
