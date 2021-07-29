import { StaticPageDTO } from '@ternala/frasier-types';

export interface IPagesSate {
  state: StaticPageDTO;
  loaderState: ISetLoadingAction;
}

export interface ISetLoadingAction {
  status: boolean;
  isAnyError: boolean;
  error: string;
}

export interface IStaticPageState {
  state: IStatticPagesData;
  loaderState: ISetLoadingAction;
}

export interface IStatticPagesData {
  items: StaticPageDTO[];
  counts: number;
}
