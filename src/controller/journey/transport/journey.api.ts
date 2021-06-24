import {
  JourneyGetResponse,
} from '@ternala/frasier-types';

// config
import { Config } from '@app/config/API';

// utils
import { authHeader, handleErrors } from '@app/utils/API';

class API {
  public async getJourney(
    id: number,
    accessToken: string,
  ): Promise<JourneyGetResponse | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + `journey/${id}`);

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
export const JourneyAPI = new API();
