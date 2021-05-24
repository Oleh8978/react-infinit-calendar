import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

interface IProps {
  setTextFromChildNotesComp: (txt: string) => void;
  textFromNotes: any;
}

const Notes: React.FC<IProps> = ({ ...props }) => {
  const onEditorStateChange = (textState) => {
    props.setTextFromChildNotesComp(textState);
  };

  return (
    <div className={'notes-module'}>
      <Editor
        defaultEditorState={props.textFromNotes}
        onEditorStateChange={onEditorStateChange}
        toolbarOnFocus
        toolbar={{
          options: ['inline', 'list'],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough'],
          },
          list: {
            inDropdown: false,
            options: ['unordered', 'ordered'],
          },
        }}
      />
    </div>
  );
};

export default Notes;
