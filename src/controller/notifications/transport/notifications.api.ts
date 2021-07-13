import { AuthUserLoginByTokenResponseDTO } from '@ternala/frasier-types/lib/index';

import { Config } from '@app/config/API';
import { authHeader, handleErrors, refreshHeader } from '@app/utils/API';

class API {
  public async patchNotification(
    accessToken: string,
    isCanSendEmail: boolean,
    isCanSendSMS: boolean,
  ): Promise<AuthUserLoginByTokenResponseDTO | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'user');

    return handleErrors(
      fetch(url.toString(), {
        method: 'PATCH',
        headers: {
          ...authHeader(accessToken),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isCanSendEmail,
          isCanSendSMS,
        }),
      }),
    );
  }
}
export const notificationAPI = new API();
