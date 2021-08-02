import { Config } from '@app/config/API';
import { authHeader, handleErrors } from '@app/utils/API';

class API {
  public async getPage(slug: string, accessToken: string): Promise<string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + `static-page/${slug}`);

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

  public async getStaticPagesList(accessToken: string): Promise<string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'static-page/list');
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
export const staticAPI = new API();
