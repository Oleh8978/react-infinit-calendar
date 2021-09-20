import React, { useEffect, useState } from 'react';
import { StatusBar, Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { configure } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Auth } from 'aws-amplify';

import awsConfig from './aws-exports';
import { AUTHENTICATION, USER } from './constants/navigation/navigators';
import Store from './src/store';

import Loader from './src/components/Loader/Loader';
import Notification from './src/components/Notification/Notification';

import AuthenticationNavigator from './src/pages/Authentication/index';
import UserNavigator from './src/pages/User/index';

async function urlOpener(url, redirectUrl) {
  if (await InAppBrowser.isAvailable()) {
    const { type, url: newUrl } = await InAppBrowser.openAuth(url, '', {
      showTitle: false,
      enableUrlBarHiding: true,
      enableDefaultShare: false,
      ephemeralWebSession: true,
    });
    if (type === 'success') {
      Linking.openURL(newUrl);
    } else if (!redirectUrl) {
      await Store.application.addError('You didn\'t finish sign out process!');
    }
  }
}

configure({ enforceActions: 'never' });
Auth.configure({
  ...awsConfig,
  Analytics: {
    disabled: true,
  },
  oauth: {
    ...awsConfig.oauth,
    urlOpener,
  },
});

const Stack = createStackNavigator();

const App = observer(() => {
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    setErrors(Store.application.globalErrors);
  }, [Store.application.globalErrors]);

  useEffect(() => {
    setNotifications(Store.application.notifications);
  }, [Store.application.notifications]);

  if (!loaded) {
    return <Loader isAbsolute />;
  }

  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}
        >
          <Stack.Screen
            name={AUTHENTICATION}
            component={AuthenticationNavigator}
          />
          <Stack.Screen name={USER} component={UserNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
      {errors.map((error) => (
        <Notification notification={error} key={error.id} />
      ))}
      {notifications.map((notification) => (
        <Notification
          notification={notification}
          key={notification.id}
          type="notification"
        />
      ))}
    </>
  );
});

export default App;
