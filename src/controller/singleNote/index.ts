import { ActionType, createReducer } from 'typesafe-actions';
import { datdDraft } from '@app/view/Account/Notes/fakeData/fakeData';

// actions
import * as actions from './actions';

// interfaces
import { INoteState } from './models';

const initialState: INoteState = {
  state: {
    id: undefined,
    content: '',
    createdAt: null,
    module: {
      id: 0,
      title: '',
      orderNumber: 0,
      createdAt: null,
    },
    user: {
      id: 0,
    },
  },
  loaderState: {
    status: false,
    isAnyError: false,
    error: '',
  },
};

export type NotesActionType = ActionType<typeof actions>;

export const GetSingleNoteReducer = createReducer<INoteState, NotesActionType>(
  initialState,
)
  .handleAction(
    actions.setLoadingAction,
    (state: INoteState, { payload }): INoteState => ({
      ...state,
      loaderState: {
        ...payload,
      },
    }),
  )
  .handleAction(
    [actions.getNoteByID.success],
    (state: INoteState, { payload }): INoteState => ({
      ...state,
      state: {
        ...payload,
      },
    }),
  )
  .handleAction(
    [actions.createNewNote.success],
    (state: INoteState, { payload }): INoteState => ({
      ...state,
      state: {
        ...payload,
      },
    }),
  )
  .handleAction(
    [actions.updateNoteById.success],
    (state: INoteState, { payload }): INoteState => ({
      ...state,
      state: {
        ...payload,
      },
    }),
  )
  .handleAction(
    [actions.deleteNoteByID.success],
    (state: INoteState): INoteState => ({
      ...state,
      state: {
        id: 0,
        content: datdDraft,
        createdAt: null,
        module: {
          id: 0,
          title: '',
          orderNumber: 0,
          createdAt: null,
        },
        user: {
          id: 0,
        },
      },
    }),
  );
