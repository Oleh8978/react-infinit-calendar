import { Config } from '@app/config/API';
import { authHeader, handleErrors } from '@app/utils/API';

// cfunctionality
import { appendSearchParams } from '@app/utils/appendSearchParams';

// models
import { IExpertsSearchParams } from '../models';

class API {
  public async getExpertsApi(
    experstsSearchParams: IExpertsSearchParams,
    accessToken: string,
  ): Promise<string> {
    let url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'expert/list');

    url = appendSearchParams(url, experstsSearchParams);

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
export const ExpertsListAPI = new API();
