import { AuthUserLoginByTokenResponseDTO } from '@ternala/frasier-types/lib/index';
import { DeviceCreateRequest } from '@ternala/frasier-types/lib/index';

import { Config } from '../../../Config/API';
import { authHeader, handleErrors, refreshHeader } from 'Utils/API';
import { getSavedAccess } from 'Utils/manageAccess';
import { getFCMToken } from 'Utils/getFCMToken';

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
        },
        body: JSON.stringify({
          FCMToken: tokenForQuery,
          authToken: receivedToken,
          deviceCredentials: deviceCredentials,
        }),
      }),
    );
  }

  public async loginByToken(
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
  ): Promise<boolean | string> {
    console.log(
      'getSavedAccess().refreshToken ',
      getSavedAccess().refreshToken,
    );
    console.log('deviceCredentials ', deviceCredentials);
    return handleErrors(
      fetch(Config.AUTH_SERVICE_ENDPOINT + 'logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...refreshHeader(getSavedAccess().refreshToken),
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
}
export const AuthAPI = new API();
