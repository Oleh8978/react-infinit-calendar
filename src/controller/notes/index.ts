import { ActionType, createReducer } from 'typesafe-actions';
import { omit } from 'lodash';

// utils
import { concatWithUnique } from '@app/utils/concatWithUnique';

// interfaces
import { INotesState } from './models';
import { NoteDTO } from '@ternala/frasier-types';
import { IStore } from '../model';

//action
import * as actions from './actions';

const initialState: INotesState = {
  state: {
    items: [],
    counts: undefined,
  },
  storedSearchParams: {
    limit: '',
    offset: '',
    query: '',
    sortType: '',
    type: '',
    modules: '',
    sortField: '',
    ids: '',
    user: '',
  },
  loaderState: {
    status: false,
    isAnyError: false,
    error: '',
  },
};

export type NotesActionType = ActionType<typeof actions>;

export const GetNotesListReducer = createReducer<INotesState, NotesActionType>(
  initialState,
)
  .handleAction(
    actions.setLoadingAction,
    (state: INotesState, { payload }): INotesState => ({
      ...state,
      loaderState: {
        ...payload,
      },
    }),
  )
  .handleAction(
    [actions.getNotesList.success],
    (state: INotesState, { payload }): INotesState => {
      const storedSearchParams = { ...state.storedSearchParams };
      const { searchParams }: any = payload;

      let newNotesList;
      if (
        JSON.stringify(omit(storedSearchParams, ['limit', 'offset'])) ===
        JSON.stringify(omit(searchParams, ['limit', 'offset']))
      ) {
        const updateArray = [];
        payload.response.items.map((item) => {
          if (
            state.state.items.filter((elem) => elem.id === item.id).length === 0
          ) {
            updateArray.push(item);
          }
        });
        newNotesList = concatWithUnique<NoteDTO>(
          state.state.items || [],
          updateArray,
        );
      } else {
        newNotesList = concatWithUnique<NoteDTO>(
          [],
          payload.response.items.map((item) => item),
        );
      }

      return {
        ...state,
        state: {
          counts: payload.response.counts,
          items: newNotesList,
        },
        storedSearchParams: searchParams,
      };
    },
  )
  .handleAction(
    [actions.createNewNote.success],
    (state: INotesState, { payload }): INotesState => {
      const iNotesState = { ...state.state };

      iNotesState.counts = iNotesState.counts + 1;
      iNotesState.items.push({
        ...payload,
      });

      return {
        ...state,
        state: {
          ...iNotesState,
        },
        storedSearchParams: state.storedSearchParams,
      };
    },
  )
  .handleAction(
    [actions.updateNoteByID],
    (state: INotesState, { payload }): INotesState => {
      const iNotesState = { ...state.state };

      const NewNotesState = [...iNotesState.items];

      const newState = NewNotesState.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            content: payload.content,
          };
        } else {
          return {
            ...item,
          };
        }
      });

      return {
        ...state,
        state: {
          counts: iNotesState.counts,
          items: newState,
        },
        storedSearchParams: state.storedSearchParams,
      };
    },
  )
  .handleAction(
    [actions.singleNoutesRemoveFromList],
    (state: INotesState, { payload }): INotesState => {
      const iNotesState = { ...state.state };

      if (iNotesState.counts > 0) {
        iNotesState.counts = iNotesState.counts - 1;
        iNotesState.items = iNotesState.items.filter(
          (item: NoteDTO) => item.id !== payload.id,
        );
      }

      return {
        ...state,
        state: {
          ...iNotesState,
        },
        storedSearchParams: state.storedSearchParams,
      };
    },
  );

export const getNotesList = (state: IStore): NoteDTO[] | undefined =>
  state.notesListReducer.state.items;
