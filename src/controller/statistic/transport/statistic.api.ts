import { Config } from '@app/config/API';
import { authHeader, handleErrors } from '@app/utils/API';
import { StatisticGetJourneyResponse } from '@ternala/frasier-types';
import { AuthUserLoginByTokenResponseDTO } from '@ternala/frasier-types';

class API {
  public async getStatisticByJourney(
    id: number,
    accessToken: string,
  ): Promise<StatisticGetJourneyResponse | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + `statistic/journey/${id}`);

    return handleErrors(
      fetch(url.toString(), {
        method: 'GET',
        headers: {
          ...authHeader(accessToken),
        },
      }),
    );
  }
  public async getStatistic(
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
export const StatisticAPI = new API();
