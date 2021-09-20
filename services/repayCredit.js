import getAccessToken from './cognito/getAccessToken';
import { SERVER_URL } from '../constants/constants';

export default async (plaidAccountId, plaidPublicToken, amount) => {
  try {
    const res = await fetch(
      `https://${SERVER_URL}/api?command=repay&plaid_account_id=${plaidAccountId}&plaid_public_token=${plaidPublicToken}&amount=${amount}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      },
    );
    console.log('repayCredit');
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  } catch (e) {
    throw new Error(e);
  }
};
