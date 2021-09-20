import getAccessToken from './cognito/getAccessToken';
import { SERVER_URL } from '../constants/constants';

export default async (plaidPublicToken) => {
  try {
    const res = await fetch(
      `https://${SERVER_URL}/api?command=plaidGetAccounts&plaid_public_token=${plaidPublicToken}`,
      {
        headers: { Authorization: `Bearer ${await getAccessToken()}` },
      },
    );
    console.log('plaidGetAccounts');
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return await res.json();
  } catch (e) {
    throw new Error(e);
  }
};
