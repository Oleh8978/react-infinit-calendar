import { Auth } from 'aws-amplify';

export default async ({ name, familyName, email, password }) => {
  try {
    return await Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        given_name: name,
        family_name: familyName,
      },
    });
  } catch (e) {
    throw new Error(e.message);
  }
};
