import React, { useEffect, useState } from 'react';

import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import moment from 'moment';

// components
import { Link } from 'react-router-dom';

// static
import { styleMap } from './NoteDetails/static';

// interfaces
import { NoteDTO } from '@ternala/frasier-types';
import { IListItem, IItem } from './Models';

interface IProps {
  data: NoteDTO;
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
        {/* <span className={'notes-list-item__left-subhead'}>
          {props.data.subtitle}
        </span> */}
        <div className={'notes-list-item__left-body'}>
          {/* {props.data.list ? (
            listFunc(props.data.list)
          ) : (
            <span className="notes-list-item__left-body-text">
              {props.data.text}
            </span>
          )} */}
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
          {/* {props.data.content.replace(/'/g, '"')} */}
        </div>
      </div>
      <div className={'notes-list-item__right'}>
        <span className={'notes-list-item__right-text'}>
          {/* {dateConvertor(props.data.data)} */}
          {moment(new Date(props.data.createdAt)).format('MM/DD/YYYY')}
        </span>
      </div>
    </Link>
  );
};

export default NotesListItem;
