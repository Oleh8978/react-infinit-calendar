import { Auth } from 'aws-amplify';

export default async () => (await Auth.currentAuthenticatedUser()).signInUserSession?.accessToken
  ?.jwtToken;
