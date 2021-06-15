import { ArticleDTO, ArticleGetListResponse, JourneyShortDTO } from '@ternala/frasier-types';

import { createdAtSortFieldEnum } from '@ternala/frasier-types/lib/constants/sortFields';
import { discoveryEntityTypeEnum } from '@ternala/frasier-types/lib/constants/main';

export interface IAcrticleCategoryState {
  articleCategoriesObject: ArticleGetListResponse;
  storedSearchParams: null | IArticleListSearchParanms;
  isLoading: boolean;
  anyErrors: boolean;
  error: string | undefined;
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

// {
//   "id": 1,
//   "title": "Title",
//   "icon": "Icon",
//   "color": "Color",
//   "orderNumber": 2,
//   "createdAt": "Mon Apr 19 2021 13:47:45 GMT+0300 (Eastern European Summer Time)",
//   "articles": [
//     {
//       "id": 1,
//       "title": "Title",
//       "image": "Image",
//       "appearance": "small",
//       "startShowingDate": "Mon Apr 19 2021 13:47:45 GMT+0300 (Eastern European Summer Time)",
//       "createdAt": "Mon Apr 19 2021 13:47:45 GMT+0300 (Eastern European Summer Time)"
//     }
//   ]
// }

export interface IArticleListSearchParanms {
  limit?: string | number;
  offset?: string | number;
  query?: string | number;
  sortType?: string;
  type?: string;
  categories?: string[] | string;
  sortField?: createdAtSortFieldEnum;
  ids?: string[] | string;
}

export interface IException {
  code: string;
  message: string;
  name?: string;
}
