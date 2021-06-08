import * as firebase from 'firebase/app';

export const getFCMToken = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    return await messaging.getToken();
  } catch (error) {
    process.env.REACT_APP_SHOW_LOGS === "true" && console.error(error);
  }
}