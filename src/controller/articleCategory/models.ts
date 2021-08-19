import {
  ArticleDTO,
  ArticleGetListResponse,
  JourneyShortDTO,
} from '@ternala/frasier-types';

import { createdAtSortFieldEnum } from '@ternala/frasier-types/lib/constants/sortFields';
import { discoveryEntityTypeEnum } from '@ternala/frasier-types/lib/constants/main';
import { moduleSortFieldEnum } from '@ternala/frasier-types/lib/constants/sortFields';

export interface IAcrticleCategoryState {
  articleCategoriesObject: ArticleGetListResponse;
  storedSearchParams: null | IArticleListSearchParanms;
  isLoading: ISetLoadingAction;
}

export interface IArticlesCategoryObject {
  id: number;
  title: string;
  icon: string;
  color: string;
  orderNumber: number;
  createdAt: string | Date;
  articles: ArticleDTO[];
}

export interface IArticleListSearchParanms {
  limit?: string | number;
  offset?: string | number;
  query?: string | number;
  sortType?: string;
  type?: string;
  categories?: string[] | string;
  onlyWithArticle?: boolean;
  sortField?: createdAtSortFieldEnum;
  ids?: string[] | string;
}

export interface IException {
  code: string;
  message: string;
  name?: string;
}

export interface ISetLoadingAction {
  status: boolean;
  anyErrors: boolean;
  error: string;
}
