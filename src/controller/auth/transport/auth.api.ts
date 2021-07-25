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
    redirectUri?: string,
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
        body:
          String(signIntype) === 'linkedIn'
            ? JSON.stringify({
                authToken: receivedToken,
                deviceCredentials: deviceCredentials,
                redirectURL: String(redirectUri),
              })
            : JSON.stringify({
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

  public async addSocialMedia(
    receivedToken: string,
    socialMediaNetworkType: string,
    socNetToken: string,
    redirectURL: string,
  ): Promise<boolean | string> {
    const url =
      new URL(Config.MAIN_SERVICE_ENDPOINT) +
      `auth/add/${socialMediaNetworkType}`;
    return handleErrors(
      fetch(url.toString(), {
        method: 'POST',
        headers: {
          ...authHeader(receivedToken),
          'Content-Type': 'application/json',
        },
        body:
          socialMediaNetworkType === 'linkedIn'
            ? JSON.stringify({
                socialNetworkToken: socNetToken,
                redirectURL: redirectURL,
              })
            : JSON.stringify({
                socialNetworkToken: socNetToken,
              }),
      }),
    );
  }

  public async removerSocialMedia(
    receivedToken: string,
    socialMediaNetworkType: string,
  ): Promise<boolean | string> {
    const url =
      new URL(Config.MAIN_SERVICE_ENDPOINT) +
      `auth/user/remove-social-network/${socialMediaNetworkType}`;
    return handleErrors(
      fetch(url.toString(), {
        method: 'POST',
        headers: {
          ...authHeader(receivedToken),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }),
    );
  }
}
export const AuthAPI = new API();
