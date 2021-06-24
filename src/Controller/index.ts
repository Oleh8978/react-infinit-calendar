import { all } from 'redux-saga/effects';
import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { authReducer, authSaga } from './auth';
import { updateUserDataSaga } from './secondStepDataUpdater/sagas/secondStepSaga';
import { UpdateAfterSignInRequestReducer } from './secondStepDataUpdater/index';
import { DiscoverySaga, discoveryListReducer } from './Discovery/index';
import { ArticleReducer, ArticleSaga } from './articleCategory/index';
import { accountUserSaga, userReducer } from './account/index';
import { todaySatisticSaga, statisticReducer } from './statistic/index';
import { listFOStatisticSaga, statisticListReducer } from './statisticList/index';

export const rootSaga = function* () {
  yield all([
    authSaga(),
    updateUserDataSaga(),
    DiscoverySaga(),
    ArticleSaga(),
    accountUserSaga(),
    todaySatisticSaga(),
    listFOStatisticSaga(),
  ]);
};

export const rootReducer = (history: History): Reducer =>
  combineReducers({
    router: connectRouter(history),
    authState: authReducer,
    updateSteUserAfterSignIn: UpdateAfterSignInRequestReducer,
    discoveryListReducer: discoveryListReducer,
    ArticleReducer: ArticleReducer,
    userReducer: userReducer,
    statisticReducer: statisticReducer,
    statisticListReducer: statisticListReducer,
  });
