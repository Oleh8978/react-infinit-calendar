import { all, put, select, takeEvery } from 'redux-saga/effects';

// exceptions
import { BadRequest } from '@app/utils/API/exceptions';

//APIs
import { notesAPI } from '../../notes/transport/notesTransport.api';

// Actions
import * as action from '../actions';

// utils
import { getAccessToken } from '@app/controller/auth';

export function* getNoteByIDSaga({
  payload,
}: ReturnType<typeof action.getNoteByID.request>) {
  const accessToken: string | undefined = yield yield select(getAccessToken);
  try {
    yield put(
      action.setLoadingAction({
        status: true,
        isAnyError: false,
        error: ``,
      }),
    );
    if (!accessToken) throw new Error('Not authorized');

    const res = yield notesAPI.getNote(payload.id, accessToken);

    if (!res && res.code) {
      yield put(
        action.setLoadingAction({
          status: true,
          isAnyError: false,
          error: `Something went wrong`,
        }),
      );
    } else {
      yield put(
        action.getNoteByID.success({
          ...res,
        }),
      );
      yield put(
        action.setLoadingAction({
          status: false,
          isAnyError: false,
          error: ``,
        }),
      );
    }
  } catch (error) {
    console.error('ERROR GETTING SINGLE NOTE: ', error);
    yield put(
      action.setLoadingAction({
        status: false,
        isAnyError: true,
        error: `Error ocured in note ${error}`,
      }),
    );
  }
}

export function* addNewNoteSaga({
  payload,
}: ReturnType<typeof action.createNewNote.request>) {
  const accessToken: string | undefined = yield yield select(getAccessToken);
  try {
    yield put(
      action.setLoadingAction({
        status: true,
        isAnyError: false,
        error: ``,
      }),
    );
    if (!accessToken) throw new Error('Not authorized');

    const res = yield notesAPI.createNote(payload, accessToken);

    if (!res && res.code) {
      yield put(
        action.setLoadingAction({
          status: false,
          isAnyError: true,
          error: `BAD REQUEST`,
        }),
      );
    } else {
      yield put(
        action.createNewNote.success({
          ...res,
        }),
      );
      yield put(
        action.setLoadingAction({
          status: false,
          isAnyError: false,
          error: ``,
        }),
      );
    }
  } catch (error) {
    console.error('ERROR IN CREATE NEW NOTE: ', error);
    yield put(
      action.setLoadingAction({
        status: false,
        isAnyError: true,
        error: `Error is ${error}`,
      }),
    );
  }
}

export function* updateNoteSaga({
  payload,
}: ReturnType<typeof action.updateNoteById.request>) {
  const accessToken: string | undefined = yield yield select(getAccessToken);

  try {
    if (!accessToken) throw new Error('Not authorized');

    const res = yield notesAPI.updateNote(payload, accessToken);

    if (!res && res.code) {
      yield put(
        action.setLoadingAction({
          status: false,
          isAnyError: true,
          error: `Bad request`,
        }),
      );
    } else {
      yield put(action.updateNoteById.success({ ...res }));
      yield put(
        action.setLoadingAction({
          status: false,
          isAnyError: false,
          error: `The request went through`,
        }),
      );
    }
  } catch (error) {
    console.error('ERRRO WHILE UPDATING NOTE: ', error);
    yield put(
      action.setLoadingAction({
        status: false,
        isAnyError: true,
        error: `The error ocured in update note saga ${error}`,
      }),
    );
  }
}

export function* deleteNoteSaga({
  payload,
}: ReturnType<typeof action.deleteNoteByID.request>) {
  const accessToken: string | undefined = yield yield select(getAccessToken);

  try {
    if (!accessToken) throw new Error('Not authorized');

    const res = yield notesAPI.deleteNote(payload, accessToken);

    if (!res && res.code) {
      yield put(
        action.setLoadingAction({
          status: false,
          isAnyError: true,
          error: `Bad request`,
        }),
      );
    } else {
      yield put(action.deleteNoteByID.success({ ...res }));
      yield put(
        action.setLoadingAction({
          status: false,
          isAnyError: false,
          error: `The request went through`,
        }),
      );
    }
  } catch (error) {
    console.error('ERRRO WHILE UPDATING NOTE: ', error);
    yield put(
      action.setLoadingAction({
        status: false,
        isAnyError: true,
        error: `The error ocured in update note saga ${error}`,
      }),
    );
  }
}

export function* singleNoteSaga() {
  yield all([
    takeEvery(action.getNoteByID.request, getNoteByIDSaga),
    takeEvery(action.createNewNote.request, addNewNoteSaga),
    takeEvery(action.updateNoteById.request, updateNoteSaga),
    takeEvery(action.deleteNoteByID.request, deleteNoteSaga),
  ]);
}
