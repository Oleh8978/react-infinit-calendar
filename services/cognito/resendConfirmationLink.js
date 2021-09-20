import { Auth } from 'aws-amplify';

export default async (username) => {
  try {
    await Auth.resendSignUp(username);
  } catch (e) {
    throw new Error(e.message);
  }
};
