import { discoveryEntityTypeEnum } from '@ternala/frasier-types/lib/constants/main';
import { ArticleDTO, ArticleGetListResponse } from '@ternala/frasier-types';

export interface IArticleListSortFieldsSearchParams {
  limit?: string | number;
  offset?: string | number;
  query?: string | number;
  sortType?: string;
  ids?: string[] | string;
  moduleCategories?: number[];
  categories?: number[];
  sections?: number[];
  sortField?: any;
}

export interface ISetLoadingAction {
  status: boolean;
}

export interface IArticleListState {
  state: ArticleGetListResponse;
  storedSearchParams: IArticleListSortFieldsSearchParams;
  loader: ISetLoadingAction;
}
