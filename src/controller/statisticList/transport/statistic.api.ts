import { AuthUserLoginByTokenResponseDTO } from '@ternala/frasier-types/lib/index';

import { Config } from '@app/config/API';
import { authHeader, handleErrors } from '@app/utils/API';

class API {
  public async GetStatisticList(
    accessToken: string,
  ): Promise<AuthUserLoginByTokenResponseDTO | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'statistic/list');

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
export const StatisticsListAPI = new API();
