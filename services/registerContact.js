import getAccessToken from './cognito/getAccessToken';
import { SERVER_URL } from '../constants/constants';

export default async (data, type = 'natural_person') => {
  try {
    const res = await fetch(
      `https://${SERVER_URL}/api?command=registerContact&type=${type}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAccessToken()}` },
        body: JSON.stringify(data),
      },
    );
    console.log('registerContact');
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  } catch (e) {
    throw new Error(e.message);
  }
};
