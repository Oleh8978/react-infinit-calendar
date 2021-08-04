import { NoteDTO } from '@ternala/frasier-types';

export interface INotesSearchPams {
  limit: number;
  offset: number;
}

export interface ICreateNoteID {
  content: string;
  module: number;
  user: number;
}

export interface IRequestBodyNotes extends ICreateNoteID {
  id: number;
}

export interface ISetLoadingAction {
  status: boolean;
  isAnyError: boolean;
  error: string;
}

export interface IGetNoteIDRequest {
  id: number;
}

export interface IGetResponseDeleting {
  success: boolean;
  message: string;
}

// state
export interface INoteState {
  state: NoteDTO;
  loaderState: ISetLoadingAction;
}
