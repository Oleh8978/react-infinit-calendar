import { ActionType, createReducer } from 'typesafe-actions';
import { omit } from 'lodash';

// utils
import { concatWithUnique } from '@app/utils/concatWithUnique';

// interfaces
import { INotesState } from './models';
import { NoteDTO } from '@ternala/frasier-types';

//action
import * as actions from './actions';

const initialState: INotesState = {
  state: {
    items: [],
    counts: undefined,
  },
  storedSearchParams: {
    limit: 0,
    offset: 0,
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
          payload.response.items.map((item) => item),
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
  );
