import { all } from 'redux-saga/effects';
import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { authReducer, authSaga } from './auth';
import { updateUserDataSaga } from './secondStepDataUpdater/sagas/secondStepSaga';
import { UpdateAfterSignInRequestReducer } from './secondStepDataUpdater/index';

export const rootSaga = function* () {
  yield all([authSaga(), updateUserDataSaga()]);
};

export const rootReducer = (history: History): Reducer =>
  combineReducers({
    router: connectRouter(history),
    authState: authReducer,
    updateSteUserAfterSignIn: UpdateAfterSignInRequestReducer,
  });
