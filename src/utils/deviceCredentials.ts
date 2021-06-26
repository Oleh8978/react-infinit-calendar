import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { DeviceCreateRequest } from '@ternala/frasier-types/lib/modules/user/device/request.dto';
import { DevicePlatformEnum } from '@ternala/frasier-types/lib/constants/main';
import { getFCMToken } from './getFCMToken';
export const getCredentials = async (): Promise<DeviceCreateRequest> => {
  const fp = await FingerprintJS.load();

  const result = await fp.get();

  const visitorId = result.visitorId;

  const fcmToken = await getFCMToken();
  // console.log('fcmToken ', fcmToken)

  return {
    platform: DevicePlatformEnum.Web,
    fingerprint: visitorId,
    FCMToken: fcmToken,
  };
};
