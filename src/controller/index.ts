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
import { todaySatisticSaga, statisticReducer } from './statistic/index';
import { statisticListReducer } from './statisticList/index';
import { currentStatisctic } from './statisticList/sagas/statisticSaga';
import { GetJourneyReducer, JourneySaga } from '@app/controller/journey';
import { StatisticsByJourneySaga } from '@app/controller/statisticJourney/sagas/statisticSaga';
import { statisticByJourneyReducer } from '@app/controller/statisticJourney';
import { FaqSagas, faqReducer } from '@app/controller/FAQ/index';
import { tipsListReducer } from '@app/controller/Tips/index';
import { TipsListSaga } from '@app/controller/Tips/sagas/index';
import { notififcationReducer } from '@app/controller/notifications/index';
import { patchNotificaionSaga } from '@app/controller/notifications/sagas/index';
import { getNotesSaga } from '@app/controller/notes/sagas/index';
import { GetNotesListReducer } from '@app/controller/notes/index';
import { GetSingleNoteReducer } from '@app/controller/singleNote/index';
import { singleNoteSaga } from '@app/controller/singleNote/sagas/index';
import { StaticPageReducer } from '@app/controller/staticPage/index';
import { getStaticPageSaga } from '@app/controller/staticPage/sagas/index';
import { GetStaticPagesListReducer } from '@app/controller/staticPages/index';
import { getStaticListPagesSaga } from '@app/controller/staticPages/sagas/index';
import { SaveBTNReducer } from '@app/controller/saveBTN/index';
import { noteLocalDataCollectorReducer } from '@app/controller/sendNoteReducer/index';
import { singleNoteSendSaga } from '@app/controller/sendNoteReducer/sagas/index';
import { ModalWindowReducer } from '@app/controller/modalWindowReducer/index';
import { notePrevStateReducer } from '@app/controller/previouseNoteText/index';
import { notePrevStateReducerModule } from '@app/controller/previouseNoteTextModule/index';
import { ArticleListReducer } from '@app/controller/articles/index';
import { ArticleListSgas } from '@app/controller/articles/sagas/index';
import { ExpertListReducer } from '@app/controller/experts/index';
import { ExpertsListSaga } from '@app/controller/experts/sagas/index';
import { ExpertSelectedStateReducer } from '@app/controller/selectedExpert/index';
import { SingleExpertReducer } from '@app/controller/expert/index';
import { getExpert } from '@app/controller/expert/sagas/index';
import { socketReducer, socketSaga } from './socket';
import { historyReducer } from './historyReducer/index';

export const rootSaga = function* () {
  yield all([
    authSaga(),
    FaqSagas(),
    updateUserDataSaga(),
    DiscoverySaga(),
    ArticleSaga(),
    accountUserSaga(),
    todaySatisticSaga(),
    currentStatisctic(),
    scheduleSaga(),
    moduleSaga(),
    HolidaySaga(),
    JourneySaga(),
    StatisticsByJourneySaga(),
    TipsListSaga(),
    patchNotificaionSaga(),
    getNotesSaga(),
    singleNoteSaga(),
    getStaticPageSaga(),
    getStaticListPagesSaga(),
    singleNoteSendSaga(),
    ArticleListSgas(),
    ExpertsListSaga(),
    getExpert(),
    socketSaga(),
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
    statisticReducer: statisticReducer,
    statisticByJourneyReducer: statisticByJourneyReducer,
    statisticListReducer: statisticListReducer,
    JourneyReducer: GetJourneyReducer,
    faqReducer: faqReducer,
    tipsListReducer: tipsListReducer,
    notififcationReducer: notififcationReducer,
    notesListReducer: GetNotesListReducer,
    singleNoteReducer: GetSingleNoteReducer,
    staticPageReducer: StaticPageReducer,
    staticPagesListReducer: GetStaticPagesListReducer,
    saveBtnReducer: SaveBTNReducer,
    noteLocalDataCollectorReducer: noteLocalDataCollectorReducer,
    ModalWindowReducer: ModalWindowReducer,
    notePrevStateReducer: notePrevStateReducer,
    notePrevStateReducerModule: notePrevStateReducerModule,
    articleListReducer: ArticleListReducer,
    expertListReducer: ExpertListReducer,
    ExpertSelectedStateReducer: ExpertSelectedStateReducer,
    SingleExpertReducer: SingleExpertReducer,
    socketState: socketReducer,
    historyState: historyReducer,
  });
