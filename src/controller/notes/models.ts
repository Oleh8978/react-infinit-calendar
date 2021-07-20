import { NoteGetListResponse } from '@ternala/frasier-types';
import { noteSortFieldEnum } from '@ternala/frasier-types/lib/constants/sortFields';

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

export interface INotesSearchParams {
  limit?: string | number;
  offset?: string | number;
  query?: string | number;
  sortType?: string;
  type?: string;
  modules?: string[] | number[] | string;
  sortField?: noteSortFieldEnum | string;
  ids?: string[] | string;
  user: number | string;
}

// state
export interface INotesState {
  state: NoteGetListResponse;
  storedSearchParams: INotesSearchParams;
  loaderState: ISetLoadingAction;
}
