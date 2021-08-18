import {
  ArticleGetResponse,
  DayOffCreateRequest,
  DayOffDeleteRequest,
  DayOffDeleteResponse,
  JourneyGetResponse,
  JourneyUserConnectCreateRequest,
  JourneyUserConnectCreateResponse,
  JourneyUserConnectDeleteRequest,
  JourneyUserConnectDeleteResponse,
  PaymentBuyResponse,
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

  public async setJourneyConnect(
    { id }: { id: number },
    accessToken: string,
  ): Promise<JourneyUserConnectCreateResponse | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + `journey/${id}/connect`);

    return handleErrors(
      fetch(url.toString(), {
        method: 'POST',
        body: JSON.stringify({
          id,
        }),
        headers: {
          'Content-type': 'application/json',
          ...authHeader(accessToken),
        },
      }),
    );
  }

  public async deleteJourneyConnect(
    data: JourneyUserConnectDeleteRequest,
    accessToken: string,
  ): Promise<JourneyUserConnectDeleteResponse | string> {
    const url = new URL(
      Config.MAIN_SERVICE_ENDPOINT + `journey/delete/connect`,
    );
    console.log('data: ', data);

    return handleErrors(
      fetch(url.toString(), {
        method: 'DELETE',
        body: JSON.stringify({
          ids: data.ids,
        }),
        headers: {
          'Content-type': 'application/json',
          ...authHeader(accessToken),
        },
      }),
    );
  }

  public async buyJourney(
    { journey }: { journey: number },
    accessToken: string,
  ): Promise<PaymentBuyResponse | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + `payment/journey`);

    return handleErrors(
      fetch(url.toString(), {
        method: 'POST',
        body: JSON.stringify({
          journey,
        }),
        headers: {
          'Content-type': 'application/json',
          ...authHeader(accessToken),
        },
      }),
    );
  }
}
export const JourneyAPI = new API();
