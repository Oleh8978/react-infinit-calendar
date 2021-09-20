import { Auth } from 'aws-amplify';

export default async (email, password) => {
  try {
    return await Auth.signIn(email, password);
  } catch (e) {
    throw new Error(e.message);
  }
};
