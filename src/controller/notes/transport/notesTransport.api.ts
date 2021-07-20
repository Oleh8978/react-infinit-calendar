
import { Config } from '@app/config/API';
import { authHeader, handleErrors } from '@app/utils/API';

// cfunctionality
import { appendSearchParams } from '@app/utils/appendSearchParams';

// models
import { INotesSearchPams, IRequestBodyNotes, ICreateNoteID } from '../models';

class API {
  public async getNotesList(
    notesSearchParams: INotesSearchPams,
    accessToken: string,
  ): Promise<string> {
    let url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'note/list');

    url = appendSearchParams(url, notesSearchParams);

    return handleErrors(
      fetch(url.toString(), {
        method: 'GET',
        headers: {
          ...authHeader(accessToken),
          'Content-Type': 'application/json',
        },
      }),
    );
  }

  public async getNote(id: number, accessToken: string): Promise<string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + `note/${id}`);

    return handleErrors(
      fetch(url.toString(), {
        method: 'GET',
        headers: {
          ...authHeader(accessToken),
          'Content-Type': 'application/json',
        },
      }),
    );
  }

  public async createNote(
    data: ICreateNoteID,
    accessToken: string,
  ): Promise<string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + `note/create`);

    return handleErrors(
      fetch(url.toString(), {
        method: 'POST',
        headers: {
          ...authHeader(accessToken),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data }),
      }),
    );
  }

  public async updateNote(
    notesData: IRequestBodyNotes,
    accessToken: string,
  ): Promise<string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'note/update');
    return handleErrors(
      fetch(url.toString(), {
        method: 'PUT',
        headers: {
          ...authHeader(accessToken),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...notesData }),
      }),
    );
  }

  public async deleteNote(ids: number[], accessToken: string): Promise<string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'note/delete');
    return handleErrors(
      fetch(url.toString(), {
        method: 'DELETE',
        headers: {
          ...authHeader(accessToken),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }),
      }),
    );
  }
}
export const notesAPI = new API();
