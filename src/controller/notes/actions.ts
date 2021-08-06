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
  ISingleNoteID,
} from './models';

import {
  NoteDTO,
  NoteGetListRequest,
  NoteGetListResponse,
  NoteShortDTO,
} from '@ternala/frasier-types';
import { GetListParameters } from '@ternala/frasier-types/lib/modules/query.dto';

// const for ath actions
export const widgetName = 'NOTES';

// loading action
export const setLoadingAction = createAction(
  `${appName}/${widgetName}/SET_ISLOADING_STATUS`,
)<ISetLoadingAction>();

// ** Action
export const getNotesList = createAsyncAction(
  `${appName}/${widgetName}/GET_NOTES_REQUEST`,
  `${appName}/${widgetName}/GET_NOTES_SUCCESS`,
  `${appName}/${widgetName}/GET_NOTES_FAILED`,
)<
  NoteGetListRequest & { callback?: any },
  {
    response: NoteGetListResponse;
    searchParams: GetListParameters;
  },
  ISetLoadingAction
>();

export const getNoteByID = createAsyncAction(
  `${appName}/${widgetName}/GET_NOTE_ID_REQUEST`,
  `${appName}/${widgetName}/GET_NOTE_ID_SUCCESS`,
  `${appName}/${widgetName}/GET_NOTE_ID_FAILED`,
)<IGetNoteIDRequest, NoteDTO, ISetLoadingAction>();

export const createNewNote = createAsyncAction(
  `${appName}/${widgetName}/POST_NOTE_REQUEST`,
  `${appName}/${widgetName}/POST_NOTE_SUCCESS`,
  `${appName}/${widgetName}/POST_NOTE_FAILED`,
)<ICreateNoteID, NoteDTO, ISetLoadingAction>();

export const updateNoteByID = createAction(
  `${appName}/${widgetName}/PUT_NOTE_INTO_THELIST`,
)<IRequestBodyNotes>();

export const deleteNoteByID = createAsyncAction(
  `${appName}/${widgetName}/DELETE_NOTE_ID_REQUEST`,
  `${appName}/${widgetName}/DELETE_NOTE_ID_SUCCESS`,
  `${appName}/${widgetName}/DELETE_NOTE_ID_FAILED`,
)<number[], IGetResponseDeleting, ISetLoadingAction>();

// remove item localy
export const singleNoutesRemoveFromList = createAction(
  `${appName}/${widgetName}/REMOVE_SINGLE_NOTE_FROM_LIST`,
)<ISingleNoteID>();
