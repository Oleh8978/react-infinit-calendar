import Routing from './Routing';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import Terms from './Component/Terms';
import PrivacyPolicy from './Component/PrivacyPolicy';


export const App: React.FC = () => {

  return (
    <Switch>
      <Route exact path='/linkedin' component={LinkedInPopUp} />
      <Route exact path='/privacy-policy' component={PrivacyPolicy}/>
      <Route exact path='/terms' component={Terms}/>
      <Route path='*' component={Routing} />
    </Switch>
  );
};

export default App;
