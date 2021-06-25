import { all, put, takeEvery, select } from 'redux-saga/effects';
// types
import {
  DeviceCreateRequest,
  AuthRefreshRequestDTO,
} from '@ternala/frasier-types';

// Exceptions
import { BadRequest } from '@app/utils/API/exceptions';

//APIs
import { StatisticsListAPI } from '../transport/statistic.api';

// Actions
import { getAccessToken, getRefreshToken } from '../../auth/index';
import * as actions from '../actions';

// Utils
import { getCredentials } from '@app/utils/deviceCredentials';

// Interfaces
import { IJourney, IJourneyObject } from '../models';

// sagas
import { checkAccessTokenExpired } from '../../auth/sagas/auth';

export function* statisticListSaga() {
  try {
    yield put(
      actions.setLoaderListState({
        status: true,
      }),
    );
    const accessToken: string | undefined = yield yield select(getAccessToken);
    const refreshToken: string | undefined = yield yield select(
      getRefreshToken,
    );
    const deviceCredentials: DeviceCreateRequest = yield getCredentials();

    const tokens: AuthRefreshRequestDTO = yield checkAccessTokenExpired({
      accessToken: accessToken,
      refreshToken: refreshToken,
      deviceCredentials,
    });
    let statisticList: IJourneyObject;
    if (typeof tokens === 'string') {
      yield put(
        actions.setLoaderListState({
          status: false,
        }),
      );
      //   clearAccess();
      throw new BadRequest();
    } else {
      statisticList = yield StatisticsListAPI.GetStatisticList(accessToken);
      yield put(actions.getStatisticList.success(statisticList.journeys));
      yield put(
        actions.setLoaderListState({
          status: false,
        }),
      );
    }
  } catch (error) {
    console.log('ERRROR STATISTIC LIST', error);
    yield put(
      actions.getStatisticList.failure({
        error: error,
        name: `The error is ${error}`,
        code: error.code,
      }),
    );
    yield put(
      actions.setLoaderListState({
        status: false,
      }),
    );
  }
}

export function* todayStatisticsSaga() {
  yield all([takeEvery(actions.getStatisticList.request, statisticListSaga)]);
}
