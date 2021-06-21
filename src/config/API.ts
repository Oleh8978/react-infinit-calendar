interface IHostEnv {
  MAIN_SERVICE_HOST: string;
  AUTH_SERVICE_HOST: string;
  WS_API_HOST: string;
}

export class Config {
  public static init(env: IHostEnv) {
    this.WS_API_HOST = env.WS_API_HOST;
    this.MAIN_SERVICE_HOST = env.MAIN_SERVICE_HOST;
    this.AUTH_SERVICE_HOST = env.AUTH_SERVICE_HOST;
  }

  // General
  public static MAIN_SERVICE_HOST: string;
  public static AUTH_SERVICE_HOST: string;
  public static WS_API_HOST: string;

  public static API_PREFIX = 'api/v1';

  public static get MAIN_SERVICE_ENDPOINT() {
    return `${this.MAIN_SERVICE_HOST}/${this.API_PREFIX}/`;
  }

  public static get AUTH_SERVICE_ENDPOINT() {
    return `${this.AUTH_SERVICE_HOST}/${this.API_PREFIX}/auth/`;
  }
  public static get WS_ENDPOINT() {
    return `${Config.WS_API_HOST}`;
  }
}

export enum SocketEventEnum {}
// UpdateEvent = 'UpdateEvent',

export enum DevicePlatformEnum {
  IOS = 'ios',
  Android = 'android',
  Web = 'web',
}
