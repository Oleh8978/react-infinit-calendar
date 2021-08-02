import { ExpertCreateRequest, ExpertDTO } from '@ternala/frasier-types';

export interface ISetLoadingAction {
  status: boolean;
  isAnyError: boolean;
  error: string;
}

export interface IExpertState {
  state: IExpertStateRequsted;
  loaderState: ISetLoadingAction;
}

export interface IExpertStateRequsted extends ExpertDTO {
  id: number;
}
