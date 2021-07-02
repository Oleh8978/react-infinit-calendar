import jwt_decode from 'jwt-decode';
import { BadRequest, Unauthorized } from './exceptions';
import { authTypeEnum } from '@ternala/frasier-types/lib/constants';

export function isJWTTokenExpired(token: string): boolean {
  const payload = jwt_decode(token) as { exp: number };
  const accessTokenExpDate = payload.exp;
  const nowTime = Math.floor(new Date().getTime() / 1000);

  return accessTokenExpDate <= nowTime;
}

export async function handleErrors<T = Record<string, never>>(
  fetch: Promise<Response>,
): Promise<T> {
  try {
    const res = await fetch;
    if (!res.ok) {
      const error = await res.json();

      if (res.status === 422) {
        throw {
          code: res.status,
          response: error,
        };
      }

      if (error?.statusCode) {
        if (error.statusCode === 403 || error.statusCode === 401) {
          throw error;
        } else {
          throw new BadRequest(error?.message);
        }
      } else if (error?.code || error?.message || error?.userMessage) {
        if (error.code === 'Unauthorized') {
          throw new Unauthorized(error?.message || error?.userMessage);
        } else {
          throw new BadRequest(error?.message || error?.userMessage);
        }
      } else {
        throw new Error(`Request filed with code: ${res.status}`);
      }
    }

    const data = await res.json();

    return data as T;
  } catch (error) {
    console.error('Fetch error: ', error);
    throw error;
  }
}

export function authHeader(token: string): {
  [authTypeEnum.access]: string;
} {
  return {
    [authTypeEnum.access]: `Bearer ${token}`,
  };
}

export function refreshHeader(token: string): {
  [authTypeEnum.refresh]: string;
} {
  return {
    [authTypeEnum.refresh]: `Bearer ${token}`,
  };
}
