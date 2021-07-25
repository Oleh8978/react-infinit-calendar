import { AuthUserLoginByTokenResponseDTO } from '@ternala/frasier-types/lib/index';

// config file
import { Config } from '@app/config/API';
import { authHeader, handleErrors, refreshHeader } from '@app/utils/API';

class API {
  public async getDataByToken(
    accessToken: string,
  ): Promise<AuthUserLoginByTokenResponseDTO | string> {
    console.log('url lgin by token config file ', Config.MAIN_SERVICE_ENDPOINT);

    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'user/by-token');
    console.log('url ', url);
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
export const userDataAPI = new API();
