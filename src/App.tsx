import Routing from './Routing';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';

export const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/linkedin" component={LinkedInPopUp} />
      <Route path="*" component={Routing} />
    </Switch>
  );
}

export default App;