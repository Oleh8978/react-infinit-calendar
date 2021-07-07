import { all, put, select, takeEvery } from 'redux-saga/effects';

// exceptions
import { BadRequest } from '@app/utils/API/exceptions';

//APIs
import { JourneyAPI } from '../transport/journey.api';

// Actions
import * as action from '../actions';

// utils
import { getAccessToken, getRefreshToken } from '@app/controller/auth';
import { buyJourneyAction, deleteJourneyConnectAction, setJourneyConnectAction } from '../actions';

export function* getJourneyData({ payload }: ReturnType<typeof action.getJourneyDataAction.request>) {
  yield put(
    action.LoaderAction({
      code: undefined,
      error: false,
      isLoading: true,
      message: 'Loading...',
    }),
  );

  try {
    const accessToken: string | undefined = yield yield select(getAccessToken);

    const res = yield JourneyAPI.getJourney(
      payload,
      accessToken,
    );

    if (res) {
      yield put(action.getJourneyDataAction.success(res));
      yield put(
        action.LoaderAction({
          code: undefined,
          error: false,
          isLoading: false,
          message: 'success loaded and put',
        }),
      );
    } else {
      yield put(
        action.LoaderAction({
          code: undefined,
          error: false,
          isLoading: false,
          message: 'error while puting the data posted',
        }),
      );
      throw new BadRequest();
    }
  } catch (error) {

    console.log('error ', error);
    yield put(
      action.LoaderAction({
        code: error.code,
        error: true,
        isLoading: false,
        message: 'failure not loaded and not sent',
      }),
    );
    action.getJourneyDataAction.failure({
      code: error.statusCode,
      message: 'Failure to load and sent updated data',
      name: 'Post updated failure',
    });
  }
}

export function* setJourneyConnectSaga({ payload, }: ReturnType<typeof setJourneyConnectAction.request>) {
  const accessToken: string | undefined = yield yield select(getAccessToken);

  yield put(
    action.LoaderAction({
      code: undefined,
      error: false,
      isLoading: true,
      message: 'Loading...',
    }),
  );

  try {
    if (!accessToken) throw new Error('Not authorized');

    const res = yield JourneyAPI.setJourneyConnect(payload, accessToken);

    if (!res && res.code) {
      yield put(
        setJourneyConnectAction.failure({
          code: res.code,
          name: res.name,
          message: res.message || 'Something was wrong'
        }),
      );

      yield put(
        action.LoaderAction({
          code: undefined,
          error: true,
          isLoading: false,
          message: 'error while puting the data posted',
        }),
      );
    } else {
      yield put(
        setJourneyConnectAction.success({
          response: res,
          additionalFields: payload,
        }),
      );
      yield put(
        action.LoaderAction({
          code: undefined,
          error: false,
          isLoading: false,
          message: 'success loaded and put',
        }),
      );
    }
  } catch (error) {
    console.error('error: ', error);
    yield put(
      setJourneyConnectAction.failure({
        name: error.name,
        code: error.code || 400,
        message: error.message || error || 'Something was wrong'
      }),
    );
    yield put(
      action.LoaderAction({
        code: error.code,
        error: true,
        isLoading: false,
        message: 'failure not loaded and not sent',
      }),
    );
  }
}

export function* deleteJourneyConnectSaga({ payload }: ReturnType<typeof deleteJourneyConnectAction.request>) {
  const accessToken: string | undefined = yield yield select(getAccessToken);

  yield put(
    action.LoaderAction({
      code: undefined,
      error: false,
      isLoading: true,
      message: 'Loading...',
    }),
  );

  try {
    if (!accessToken) throw new Error('Not authorized');

    const res = yield JourneyAPI.deleteJourneyConnect(payload, accessToken);

    if (!res && res.code) {
      yield put(
        deleteJourneyConnectAction.failure({
          name: res.name,
          code: res.code,
          message: res.message || 'Something was wrong'
        }),
      );

      yield put(
        action.LoaderAction({
          code: undefined,
          error: true,
          isLoading: false,
          message: 'error while puting the data posted',
        }),
      );
    } else {
      yield put(
        deleteJourneyConnectAction.success({
          response: res,
          additionalFields: payload,
        }),
      );
      yield put(
        action.LoaderAction({
          code: undefined,
          error: false,
          isLoading: false,
          message: 'success loaded and put',
        }),
      );
    }
  } catch (error) {
    console.error('error: ', error);
    yield put(
      deleteJourneyConnectAction.failure({
        name: error.name,
        code: error.code || 400,
        message: error.message || error || 'Something was wrong'
      }),
    );
    yield put(
      action.LoaderAction({
        code: error.code,
        error: true,
        isLoading: false,
        message: 'failure not loaded and not sent',
      }),
    );
  }
}

export function* buyJourneySaga({ payload, }: ReturnType<typeof buyJourneyAction.request>) {
  const accessToken: string | undefined = yield yield select(getAccessToken);

  yield put(
    action.LoaderAction({
      code: undefined,
      error: false,
      isLoading: true,
      message: 'Loading...',
    }),
  );

  try {
    if (!accessToken) throw new Error('Not authorized');

    const res = yield JourneyAPI.buyJourney(payload, accessToken);

    if (!res && res.code) {

      yield put(
        buyJourneyAction.failure({
          code: res.code,
          name: res.name,
          message: res.message || 'Something was wrong'
        }),
      );

      yield put(
        action.LoaderAction({
          code: undefined,
          error: true,
          isLoading: false,
          message: 'error while puting the data posted',
        }),
      );
    } else {
      yield put(
        buyJourneyAction.success({
          response: res,
          additionalFields: payload,
        }),
      );

      if(res.redirectURI !== undefined) {
        window.open(res.redirectURI, '_blank')
      }

      yield put(
        action.LoaderAction({
          code: undefined,
          error: false,
          isLoading: false,
          message: 'success loaded and put',
        }),
      );
    }
  } catch (error) {
    console.error('error: ', error);
    yield put(
      buyJourneyAction.failure({
        name: error.name,
        code: error.code || 400,
        message: error.message || error || 'Something was wrong'
      }),
    );
    yield put(
      action.LoaderAction({
        code: error.code,
        error: true,
        isLoading: false,
        message: 'failure not loaded and not sent',
      }),
    );
  }
}

export function* getJourneyDataSaga() {
  yield all([
    takeEvery(action.getJourneyDataAction.request, getJourneyData),
    takeEvery(setJourneyConnectAction.request, setJourneyConnectSaga),
    takeEvery(deleteJourneyConnectAction.request, deleteJourneyConnectSaga),
    takeEvery(buyJourneyAction.request, buyJourneySaga),
  ]);
}
