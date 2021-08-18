import { all, put, takeEvery, select } from 'redux-saga/effects';

//APIs
import { notesAPI } from '@app/controller/notes/transport/notesTransport.api';

// Actions
import * as action from '../actions';
import * as notesListActions from '@app/controller/notes/actions';

// sagas

import { getNotesList } from '@app/controller/notes/index';

// utils
import {
  clearAccess,
  saveAccess,
  getSavedAccess,
} from '@app/utils/manageAccess';

export function* sendNoteSaga({
  payload,
}: ReturnType<typeof action.sendNoteAction.request>) {
  try {
    const resp = yield notesAPI.createNote(
      { ...payload },
      getSavedAccess().accessToken,
    );
    // console.log('response ', resp);
    if (resp !== undefined) {
      yield put(notesListActions.getNotesList.request({}));
    }
  } catch (error) {
    console.log('SEND NOTE ERROR: ', error);
  }
}

export function* singleNoteSendSaga() {
  yield all([takeEvery(action.sendNoteAction.request, sendNoteSaga)]);
}
