import { IAuthData } from '../Controller/auth/model';

import { authTypeEnum } from '@ternala/frasier-types/lib/constants/main';

export const saveAccess = ({ accessToken, refreshToken }: IAuthData) => {
  localStorage[authTypeEnum.access] = accessToken;
  localStorage[authTypeEnum.refresh] = refreshToken;
};

export const clearAccess = () => {
  localStorage.removeItem(authTypeEnum.access);
  localStorage.removeItem(authTypeEnum.refresh);
};

export const getSavedAccess = (): IAuthData | undefined => {
  return {
    accessToken: localStorage[authTypeEnum.access],
    refreshToken: localStorage[authTypeEnum.refresh],
  };
};

export const getSavedAccessToken = () => {
  return localStorage[authTypeEnum.access];
};

export const getSavedRefreshToken = () => {
  return localStorage[authTypeEnum.refresh];
};
