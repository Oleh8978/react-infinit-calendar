import { ExpertGetListResponse } from '@ternala/frasier-types';

export interface IExpertsSearchParams {
  limit?: number;
  offset?: number;
  query?: string;
  sortType?: string;
  ids?: number[];
  moduleCategories?: number[];
  sortField?: string[];
}

export interface ISetLoadingAction {
  status: boolean;
  isAnyError: boolean;
  error: string;
}

export interface IExpertsState {
  state: ExpertGetListResponse;
  storedSearchParams: IExpertsSearchParams;
  loaderState: ISetLoadingAction;
}
