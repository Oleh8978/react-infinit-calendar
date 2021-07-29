import { AuthUserLoginByTokenResponseDTO } from '@ternala/frasier-types/lib/index';

import { Config } from '@app/config/API';
import { authHeader, handleErrors, refreshHeader } from '@app/utils/API';

// cfunctionality
import { appendSearchParams } from '@app/utils/appendSearchParams';

// models
import { IArticleListSortFieldsSearchParams } from '../models';

class API {
  public async getArticleList(
    articleListSearchParams: IArticleListSortFieldsSearchParams,
    accessToken: string,
  ): Promise<any | string> {
    let url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'article/list');

    url = appendSearchParams(url, articleListSearchParams);

    if (Array.isArray(articleListSearchParams['ids'])) {
      articleListSearchParams['ids']?.forEach((item) => {
        url.searchParams.append(`${'ids'}[]`, String(item));
      });
    }

    if (Array.isArray(articleListSearchParams['categories'])) {
      articleListSearchParams['categories']?.forEach((item) => {
        url.searchParams.append(`${'categories[]'}`, String(item));
      });
    }

    if (Array.isArray(articleListSearchParams['moduleCategories'])) {
      articleListSearchParams['moduleCategories']?.forEach((item) => {
        url.searchParams.append(`${'moduleCategories[]'}`, String(item));
      });
    }

    return handleErrors(
      fetch(url.toString(), {
        method: 'GET',
        headers: {
          ...authHeader(accessToken),
          'Content-Type': 'application/json',
        },
      }),
    );
  }

  public async getArticle(
    id: number,
    accessToken: string,
  ): Promise<any | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + `article/${id}`);

    return handleErrors(
      fetch(url.toString(), {
        method: 'GET',
        headers: {
          ...authHeader(accessToken),
        },
      }),
    );
  }
}
export const ArticleAPI = new API();
