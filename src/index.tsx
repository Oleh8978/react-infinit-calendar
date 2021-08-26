import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import 'swiper/swiper.scss';

//serviceWorker
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// StartJS
import { startJs } from './startJS';

// SCSS
import './asset/scss/main.scss';

// Vitals
import reportWebVitals from './reportWebVitals';

// config
import { Config } from '@app/config/API';

// Store
import store from '@app/controller/store';

// History
import history from './historyApi';

// Root view
import RoutingSchema from './routing/schema';
import App from './App';

Config.init({
  MAIN_SERVICE_HOST: process.env.REACT_APP_MAIN_SERVICE_HOST || '',
  AUTH_SERVICE_HOST: process.env.REACT_APP_AUTH_SERVICE_HOST || '',
  WS_API_HOST: process.env.REACT_APP_WS_API_HOST || '',
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

startJs();

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
