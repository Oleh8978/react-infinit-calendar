import getAccessToken from './cognito/getAccessToken';
import { SERVER_URL } from '../constants/constants';

export default async () => {
  try {
    const res = await fetch(
      `https://${SERVER_URL}/api?command=sendCSV&filter=payments,transfers`,
      { headers: { Authorization: `Bearer ${await getAccessToken()}` } },
    );
    console.log('sendTransactionSCV');
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  } catch (e) {
    throw new Error(e);
  }
};
