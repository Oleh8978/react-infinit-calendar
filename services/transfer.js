import getAccessToken from './cognito/getAccessToken';
import { SERVER_URL } from '../constants/constants';

export default async (coin, from, to, amount) => {
  try {
    const res = await fetch(
      `https://${SERVER_URL}/api?command=transfer&coin=${coin}&from=${from}&to=${to}&amount=${amount}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      },
    );
    console.log('transfer');
    if (!res.ok) {
      throw new Error(await res.text());
    }
  } catch (e) {
    throw new Error(e);
  }
};
