import { all, put, takeEvery, select } from 'redux-saga/effects';
// types
import {
  DeviceCreateRequest,
  AuthRefreshRequestDTO,
} from '@ternala/frasier-types';

// Exceptions
import { BadRequest } from '@app/utils/API/exceptions';

//APIs
import { StatisticByJourneyAPI } from '../transport/statistic.api';

// Actions
import { getAccessToken, getRefreshToken } from '../../auth/index';
import * as actions from '../actions';
import { LoaderAction } from '@app/config/constants';

// Utils
import { getCredentials } from '@app/utils/deviceCredentials';

// Interfaces

// sagas
import { checkAccessTokenExpired } from '../../auth/sagas/auth';
import { getJourneyStatisticAction } from '../actions';
import * as action from '@app/controller/holidays/actions';
import uuid from '@app/utils/uuid';
import { addError, addLoader, removeLoader } from '@app/controller/statisticJourney';

export function* journeyStatisticSaga({ payload }: ReturnType<typeof getJourneyStatisticAction.request>) {
  const loadId = uuid();
  yield put(
    addLoader({
      id: loadId,
      message: 'Please wait, statistics are loading!',
      type: LoaderAction.statistic.getStatisticByJourney,
    }),
  );

  try {
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

    let journeyStatisticData;

    if (typeof tokens === 'string') {
      yield put(
        addError({
          id: loadId,
          message: 'Failed to get statistics!',
          type: LoaderAction.statistic.getStatisticByJourney,
        }),
      );
      throw new BadRequest();
    } else {
      journeyStatisticData = yield StatisticByJourneyAPI.getStatisticByJourney(payload, accessToken);
      yield put(actions.getJourneyStatisticAction.success({  response: journeyStatisticData }));
      yield put(
        removeLoader({
          id: loadId,
        }),
      );
    }
  } catch (error) {
    console.log('error statistic by journey ', error);
    yield put(
      addError({
        id: loadId,
        message: 'Failed to get statistics!',
        type: LoaderAction.statistic.getStatisticByJourney,
      }),
    );
    yield put(
      actions.getJourneyStatisticAction.failure({
        code: error.code,
        message: `The error is ${error}`,
        name: error.name,
      }),
    );
  }
}

export function* StatisticsByJourneySaga() {
  yield all([
    takeEvery(actions.getJourneyStatisticAction.request, journeyStatisticSaga),
  ]);
}
