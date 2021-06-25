import { all, put, takeEvery, select } from 'redux-saga/effects';
// types
import {
  DeviceCreateRequest,
  AuthRefreshRequestDTO,
} from '@ternala/frasier-types';

// Exceptions
import { BadRequest } from '@app/utils/API/exceptions';

//APIs
import { StatisticsAPI } from '../transport/statistic.api';

// Actions
import { getAccessToken, getRefreshToken } from '../../auth/index';
import * as actions from '../actions';

// Utils
import { getCredentials } from '@app/utils/deviceCredentials';

// Interfaces
import { IstatisticToday } from '../models';

// sagas
import { checkAccessTokenExpired } from '../../auth/sagas/auth';

export function* statisticSaga() {
  try {
    yield put(
      actions.setLoaderState({
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
    let statisticData: IstatisticToday;
    if (typeof tokens === 'string') {
      yield put(
        actions.setLoaderState({
          status: false,
        }),
      );
      //   clearAccess();
      throw new BadRequest();
    } else {
      statisticData = yield StatisticsAPI.GetStatistic(accessToken);
      yield put(actions.getStatisticToday.success({ ...statisticData }));
      console.log('statisticData');
      yield put(
        actions.setLoaderState({
          status: false,
        }),
      );
    }
  } catch (error) {
    console.log('ERRROR STATISTIC ', error);
    yield put(
      actions.getStatisticToday.failure({
        error: error,
        name: `The error is ${error}`,
        code: error.code,
      }),
    );
    yield put(
      actions.setLoaderState({
        status: false,
      }),
    );
  }
}

export function* todayStatisticsSaga() {
  yield all([takeEvery(actions.getStatisticToday.request, statisticSaga)]);
}
