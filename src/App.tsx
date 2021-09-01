import Routing from '@app/routing';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import Terms from './component/Terms';
import PrivacyPolicy from './component/PrivacyPolicy';
import SplashScreen from '@app/pwa/SplashScreen';

// window.addEventListener('DOMContentLoaded', (event) => {
//   console.log('DOM fully loaded and parsed');
// });

// if (navigator.onLine) {
//   console.log('online');
// } else {
//   console.log('offline');
// }

export const App: React.FC = () => {
  const [splash, setSplash] = useState<boolean>(true);
  const [locationKeys, setLocationKeys] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 4000);
  }, [splash]);

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === 'PUSH') {
        setLocationKeys([location.key]);
        if (history.location.pathname === '/module') {
          history.push('/schedule');
        }
      }

      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);
          if (history.location.pathname === '/module') {
            history.push('/schedule');
          }
        }
      }
    });
  }, [locationKeys]);

  return (
    <>
      {splash === true && localStorage.getItem('authorization') === null ? (
        <SplashScreen />
      ) : (
        <Switch>
          <Route exact path="/linkedin" component={LinkedInPopUp} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route exact path="/terms" component={Terms} />
          <Route path="*" component={Routing} />
        </Switch>
      )}
    </>
  );
};

export default App;
