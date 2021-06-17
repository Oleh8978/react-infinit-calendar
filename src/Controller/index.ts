import { all } from 'redux-saga/effects';
import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { authReducer, authSaga } from './auth';
import { updateUserDataSaga } from './secondStepDataUpdater/sagas/secondStepSaga';
import { UpdateAfterSignInRequestReducer } from './secondStepDataUpdater/index';
import { scheduleReducer, scheduleSaga } from './schedule';
import { moduleReducer, moduleSaga } from './module';
import { DiscoverySaga, discoveryListReducer } from './Discovery/index';
import { ArticleReducer, ArticleSaga } from './articleCategory/index';
import { GetHolidayReducer, HolidaySaga } from './holidays';
import { accountUserSaga, userReducer } from './account/index';

export const rootSaga = function* () {
  yield all([
    authSaga(),
    updateUserDataSaga(),
    DiscoverySaga(),
    ArticleSaga(),
    accountUserSaga(),
    scheduleSaga(),
    moduleSaga(),
    HolidaySaga()
  ]);
};

export const rootReducer = (history: History): Reducer =>
  combineReducers({
    router: connectRouter(history),
    authState: authReducer,
    scheduleState: scheduleReducer,
    moduleState: moduleReducer,
    updateSteUserAfterSignIn: UpdateAfterSignInRequestReducer,
    discoveryListReducer: discoveryListReducer,
    ArticleReducer: ArticleReducer,
    HolidayReducer: GetHolidayReducer,
    userReducer: userReducer,
  });
