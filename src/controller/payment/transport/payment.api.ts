import { Config } from '@app/config/API';
import { authHeader, handleErrors } from '@app/utils/API';
import {
  PaymentChangeStatusResponse,
  PaymentGetResponse,
  StatisticGetJourneyResponse,
} from '@ternala/frasier-types';
import { AuthUserLoginByTokenResponseDTO } from '@ternala/frasier-types';

class API {
  public async getPaymentInfo(
    paymentId: string,
    accessToken: string,
  ): Promise<PaymentGetResponse | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + `payment/${paymentId}`);

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
export const PaymentAPI = new API();
