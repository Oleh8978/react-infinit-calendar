import React, { Component, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
//import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface IProps {}

const Notes: React.FC<IProps> = () => {
  const [textState, setTextState] = useState(undefined);

  const onEditorStateChange = (textState) => {
    setTextState(textState);
  };

  return (
    <div className={'notes'}>
      <Editor
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
