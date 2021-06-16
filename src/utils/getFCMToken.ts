import * as firebase from 'firebase/app';
import '@firebase/messaging';

export const getFCMToken = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    return await messaging.getToken();
  } catch (error) {
    // console.log('fcm token error ', error);
    // TODO: Check problem
    process.env.REACT_APP_SHOW_LOGS === 'true' && console.error(error);
  }
};
