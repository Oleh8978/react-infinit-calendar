import Routing from '@app/routing';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import Terms from './component/Terms';
import PrivacyPolicy from './component/PrivacyPolicy';

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
});

// if (navigator.onLine) {
//   console.log('online');
// } else {
//   console.log('offline');
// }

export const App: React.FC = () => {
  // useEffect(() => {
  //   if (document.readyState === 'complete') {
  //     console.log('done ');
  //   }
  // }, [document]);

  useEffect(() => console.log('mounted'), []);
  return (
    <Switch>
      <Route exact path="/linkedin" component={LinkedInPopUp} />
      <Route exact path="/privacy-policy" component={PrivacyPolicy} />
      <Route exact path="/terms" component={Terms} />
      <Route path="*" component={Routing} />
    </Switch>
  );
};

export default App;
