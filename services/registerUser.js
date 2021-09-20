import { Auth } from 'aws-amplify';
import getAccessToken from './cognito/getAccessToken';
import { SERVER_URL } from '../constants/constants';

export default async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const res = await fetch(
      `https://${SERVER_URL}/api?command=register&email=${user.attributes.email}&name=${user.attributes.given_name} ${user.attributes.family_name}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAccessToken()}` },
      },
    );
    console.log('register');
    if (!res.ok) {
      throw new Error(await res.text());
    }
  } catch (e) {
    throw new Error(e);
  }
};
