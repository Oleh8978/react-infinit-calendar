import { Config } from '@app/config/API';
import { authHeader, handleErrors,} from '@app/utils/API';

class API {
  public async submitDataAPI(
    accessToken: string,
    categoryID: string,
    description: string,
  ): Promise<boolean | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'article-request/create');

    return handleErrors(
      fetch(url.toString(), {
        method: 'POST',
        headers: {
          ...authHeader(accessToken),
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          description: description,
          articleCategory: categoryID,
        }),
      }),
    );
  }
}
export const faqAPI = new API();
