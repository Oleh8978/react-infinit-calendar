import { AuthUserLoginByTokenResponseDTO } from '@ternala/frasier-types/lib/index';

import { Config } from '@app/config/API';
import { authHeader, handleErrors } from '@app/utils/API';

class API {
  public async GetStatistic(
    accessToken: string,
  ): Promise<AuthUserLoginByTokenResponseDTO | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'statistic');

    url.searchParams.append(`${'date'}`, String(new Date()));

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
export const StatisticsAPI = new API();
