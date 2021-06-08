import { AuthUserLoginByTokenResponseDTO } from '@ternala/frasier-types/lib/index';
import { DeviceCreateRequest } from '@ternala/frasier-types/lib/index';

import { Config } from '../../../Config/API';
import { authHeader, handleErrors, refreshHeader } from '../../../utils/API';

import { IAuthData, IDeviceCredentials } from '../model';

class API {
  public async signIn(
    receivedToken: string,
    signIntype: string,
    deviceCredentials: IDeviceCredentials,
  ): Promise<AuthUserLoginByTokenResponseDTO | string> {
    const url =
      new URL(Config.MAIN_SERVICE_ENDPOINT) + 'auth/' + String(signIntype);
    return handleErrors(
      fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authToken: receivedToken,
          deviceCredentials: deviceCredentials,
        }),
      }),
    );
  }

  public async loginByToken(
    accessToken: string,
  ): Promise<AuthUserLoginByTokenResponseDTO | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'user/get-user');

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
      fetch(Config.AUTH_SERVICE_ENDPOINT + 'refresh-token', {
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
    return handleErrors(
      fetch(Config.AUTH_SERVICE_ENDPOINT + 'logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deviceCredentials),
      }),
    );
  }
}
export const AuthAPI = new API();
