import getAccessToken from './cognito/getAccessToken';
import { SERVER_URL } from '../constants/constants';

export default async (name) => {
  try {
    const res = await fetch(
      `https://${SERVER_URL}/api?command=getAgreement&name=${name}&signature=${name}`,
      {
        headers: { Authorization: `Bearer ${await getAccessToken()}` },
      },
    );
    console.log('getUserAgreement');
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return await res.json();
  } catch (e) {
    throw new Error(e);
  }
};
