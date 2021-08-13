import React from 'react';

import {
  EditorState,
  convertFromRaw,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import moment from 'moment';

// components
import { Link } from 'react-router-dom';

// static
import { styleMap } from './NoteDetails/static';

interface IProps {
  data: any;
}

const NotesListItem: React.FC<IProps> = ({ ...props }) => {

  return (
    <Link
      className={'notes-list-item'}
      to={(location) => ({
        ...location,
        pathname: `/note-details/${props.data.id}`,
      })}>
      <div className={'notes-list-item__left'}>
        <span className={'notes-list-item__left-headtop'}>
          {props.data.module.title}
        </span>
        <span className={'notes-list-item__left-subhead'}>
          {props.data.module.journey.title}
        </span>
        <div className={'notes-list-item__left-body'}>
          {props.data.content !== undefined ? (
            <Editor
              editorState={EditorState.createWithContent(
                convertFromRaw(
                  JSON.parse(props.data.content),
                ),
              )}
              customStyleMap={styleMap}
              defaultEditorState={EditorState.createWithContent(
                convertFromRaw(
                  JSON.parse(props.data.content),
                ),
              )}
              readOnly={true}
            />
          ) : (
            <> </>
          )}
        </div>
      </div>
      <div className={'notes-list-item__right'}>
        <span className={'notes-list-item__right-text'}>
          {moment(new Date(props.data.createdAt)).format('MM/DD/YYYY')}
        </span>
      </div>
    </Link>
  );
};

export default NotesListItem;
