import { Config } from '@app/config/API';
import { authHeader, handleErrors } from '@app/utils/API';

class API {
  public async getExpertByID(id: number, accessToken: string): Promise<string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + `expert/${id}`);

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
export const getExpertAPI = new API();
