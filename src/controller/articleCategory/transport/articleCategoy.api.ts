import { AuthUserLoginByTokenResponseDTO } from '@ternala/frasier-types/lib/index';

import { Config } from '@app/config/API';
import { authHeader, handleErrors, refreshHeader } from '@app/utils/API';

// cfunctionality
import { appendSearchParams } from '@app/utils/appendSearchParams';

// models
import { IArticleListSearchParanms } from '../models';

class API {
  public async getArticleCategories(
    discoverySearchParams: IArticleListSearchParanms,
    accessToken: string,
  ): Promise<AuthUserLoginByTokenResponseDTO | string> {
    let url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'article-category/list');

    url = appendSearchParams(url, discoverySearchParams);

    if (Array.isArray(discoverySearchParams['ids'])) {
      discoverySearchParams['ids']?.forEach((item) => {
        url.searchParams.append(`${'ids'}[]`, String(item));
      });
    }

    if (Array.isArray(discoverySearchParams['categories'])) {
      discoverySearchParams['categories']?.forEach((item) => {
        url.searchParams.append(`${'categories[]'}`, String(item));
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
}
export const ArticleCategoryAPI = new API();
