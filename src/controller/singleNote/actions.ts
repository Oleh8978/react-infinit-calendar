import { createAction, createAsyncAction } from 'typesafe-actions';

// app name
import { appName } from '@app/config/index';

//Interfaces
import {
  ISetLoadingAction,
  IGetNoteIDRequest,
  IGetResponseDeleting,
  ICreateNoteID,
  IRequestBodyNotes,
} from './models';

import { NoteDTO } from '@ternala/frasier-types';

// const for ath actions
export const widgetName = 'SINGLE_NOTE';

// loading action
export const setLoadingAction = createAction(
  `${appName}/${widgetName}/SET_ISLOADING_STATUS`,
)<ISetLoadingAction>();

// ** Action

export const getNoteByID = createAsyncAction(
  `${appName}/${widgetName}/GET_SINGLE_NOTE_ID_REQUEST`,
  `${appName}/${widgetName}/GET_SINGLE_NOTE_ID_SUCCESS`,
  `${appName}/${widgetName}/GET_SINGLE_NOTE_ID_FAILED`,
)<IGetNoteIDRequest, NoteDTO, ISetLoadingAction>();

export const createNewNote = createAsyncAction(
  `${appName}/${widgetName}/POST_SINGLE_NOTE_REQUEST`,
  `${appName}/${widgetName}/POST_SINGLE_NOTE_SUCCESS`,
  `${appName}/${widgetName}/POST_SINGLE_NOTE_FAILED`,
)<ICreateNoteID, NoteDTO, ISetLoadingAction>();

export const updateNoteByID = createAsyncAction(
  `${appName}/${widgetName}/PUT_SINGLE_NOTE_ID_REQUEST`,
  `${appName}/${widgetName}/PUT_SINGLE_NOTE_ID_SUCCESS`,
  `${appName}/${widgetName}/PUT_SINGLE_NOTE_ID_FAILED`,
)<IRequestBodyNotes, NoteDTO, ISetLoadingAction>();

export const deleteNoteByID = createAsyncAction(
  `${appName}/${widgetName}/DELETE_SINGLE_NOTE_ID_REQUEST`,
  `${appName}/${widgetName}/DELETE_SINGLE_NOTE_ID_SUCCESS`,
  `${appName}/${widgetName}/DELETE_SINGLE_NOTE_ID_FAILED`,
)<number[], IGetResponseDeleting, ISetLoadingAction>();
