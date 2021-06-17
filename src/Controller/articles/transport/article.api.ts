import { ArticleGetResponse } from '@ternala/frasier-types';
import { Config } from '../../../Config/API';
import { authHeader, handleErrors } from 'Utils/API';

class API {
  public async getArticle(
    id: number,
    accessToken: string,
  ): Promise<ArticleGetResponse | string> {
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
