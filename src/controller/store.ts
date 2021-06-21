import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer, rootSaga } from './index';
import history from 'historyApi';

const sagaMiddleware = createSagaMiddleware();
let middleWares = applyMiddleware(routerMiddleware(history), sagaMiddleware);

if (process.env.NODE_ENV === 'development') {
  middleWares = composeWithDevTools(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
  );
} else {
  // console.log = () => {};
}

const store = createStore(rootReducer(history), middleWares);
sagaMiddleware.run(rootSaga);

(window as any).store = store;

export default store;
