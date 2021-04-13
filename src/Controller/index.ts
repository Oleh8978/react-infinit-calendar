import { all } from "redux-saga/effects";
import { combineReducers, Reducer } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { authReducer, authSaga } from './auth';

export const rootSaga = function* () {
  yield all([
    authSaga()
  ]);
};

export const rootReducer = (history: History): Reducer =>
  combineReducers({
    router: connectRouter(history),
    authState: authReducer,
  });
