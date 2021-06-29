import { AuthUserLoginByTokenResponseDTO } from '@ternala/frasier-types/lib/index';
import { DeviceCreateRequest } from '@ternala/frasier-types/lib/index';

import { Config } from '@app/config/API';
import { authHeader, handleErrors, refreshHeader } from '@app/utils/API';
import { getSavedAccess } from '@app/utils/manageAccess';
import { getFCMToken } from '@app/utils/getFCMToken';

import { IAuthData, IDeviceCredentials } from '../model';

class API {
  public async signIn(
    receivedToken: string,
    signIntype: string,
    deviceCredentials: IDeviceCredentials,
  ): Promise<AuthUserLoginByTokenResponseDTO | string> {
    const url =
      new URL(Config.MAIN_SERVICE_ENDPOINT) + 'auth/' + String(signIntype);
    let tokenForQuery: any = '';
    const tokenFCM = getFCMToken();
    if (!tokenFCM) {
      tokenForQuery = '';
    } else if (tokenFCM !== undefined) {
      tokenForQuery = tokenFCM;
    }

    return handleErrors(
      fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // ...authHeader(receivedToken),
        },
        body: JSON.stringify({
          authToken: receivedToken,
          deviceCredentials: deviceCredentials,
          redirectURL:
            String(signIntype) === 'linkedin'
              ? 'https://frasier.ternala.com/linkedin'
              : '',
        }),
      }),
    );
  }

  public async loginByToken(
    accessToken: string,
  ): Promise<AuthUserLoginByTokenResponseDTO | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'user/by-token');

    return handleErrors(
      fetch(url.toString(), {
        method: 'GET',
        headers: {
          ...authHeader(accessToken),
        },
      }),
    );
  }

  public async refreshToken(
    refreshToken: string,
    deviceCredentials: DeviceCreateRequest,
  ): Promise<IAuthData | string> {
    return handleErrors(
      fetch(Config.AUTH_SERVICE_ENDPOINT + 'user/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...refreshHeader(refreshToken),
        },
        body: JSON.stringify(deviceCredentials),
      }),
    );
  }

  public async logout(
    deviceCredentials: DeviceCreateRequest,
    refreshToken: string,
  ): Promise<boolean | string> {
    return handleErrors(
      fetch(Config.AUTH_SERVICE_ENDPOINT + 'user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...refreshHeader(refreshToken),
        },
        // body: JSON.stringify(deviceCredentials),
        body: JSON.stringify({
          deviceCredentials: {
            FCMToken: 'FCMToken',
            platform: 'web',
            fingerprint: 'hash',
          },
        }),
      }),
    );
  }

  public async deleteProfile(authToken: string): Promise<boolean | string> {
    return handleErrors(
      fetch(Config.MAIN_SERVICE_ENDPOINT + 'user/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader(authToken),
        },
      }),
    );
  }
}
export const AuthAPI = new API();
