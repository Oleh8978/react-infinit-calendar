import getAccessToken from './cognito/getAccessToken';
import { SERVER_URL } from '../constants/constants';

export default async () => {
  try {
    const res = await fetch(
      `https://${SERVER_URL}/api?command=kycStatus`,
      {
        headers: { Authorization: `Bearer ${await getAccessToken()}` },
      },
    );
    console.log('kycStatus');
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return await res.json();
  } catch (e) {
    throw new Error(e);
  }
};
