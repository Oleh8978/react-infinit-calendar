import { createAction, createAsyncAction } from 'typesafe-actions';

import { appName } from '@app/config';

// interfaces
import { INotePrepareForSending, INotesSendResponse } from './models';

// widjet name
export const widgetName = 'NOTE_DATA_COLLECTOR';

// loading action
export const setLocalDataForNote = createAction(
  `${appName}/${widgetName}/MANAGE_DATA`,
)<INotePrepareForSending>();

export const sendNoteAction = createAsyncAction(
  `${appName}/${widgetName}/SEND_NOTES_REQUEST`,
  `${appName}/${widgetName}/SEND_NOTES_SUCCESS`,
  `${appName}/${widgetName}/SEND_NOTES_FAILURE`,
)<INotePrepareForSending, INotesSendResponse, any[]>();
