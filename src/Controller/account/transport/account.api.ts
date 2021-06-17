import { AuthUserLoginByTokenResponseDTO } from '@ternala/frasier-types/lib/index';

// config file 
import { Config } from '../../../Config/API';
import { authHeader, handleErrors, refreshHeader } from 'Utils/API';


class API {

  public async getDataByToken(
    accessToken: string,
  ): Promise<AuthUserLoginByTokenResponseDTO | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'user/by-token');
    console.log('url lgin by token ',url)

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
