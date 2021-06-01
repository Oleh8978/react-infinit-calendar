import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { DeviceCreateRequest, DevicePlatformEnum } from '@ternala/frasier-types';
import { getFCMToken } from './getFCMToken';

export const getCredentials = async (): Promise<DeviceCreateRequest> => {
  const fp = await FingerprintJS.load();

  const result = await fp.get();

  const visitorId = result.visitorId;

  const fcmToken = await getFCMToken();

  return {
    platform: DevicePlatformEnum.Web,
    fingerprint: visitorId,
    FCMToken: fcmToken,
  };
};
