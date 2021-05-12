import React, { Component, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
//import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Bold from '../staticHardcoded/bold.svg';

interface IProps {
}

const Notes: React.FC<IProps> = () => {
  const [textState, setTextState] = useState(undefined);

  const onEditorStateChange = (textState) => {
    setTextState(textState);
  };

  return <div className={'notes'}>
    <Editor
      onEditorStateChange={onEditorStateChange}
      toolbarOnFocus
      toolbar={{
        options: ['inline', 'list'],
        inline: {
          options: ['bold', 'italic', 'underline', 'strikethrough'],
          bold: { icon: Bold },
          // italic: {  },
          // underline: {  },
          // strikethrough: {  },
        },
        list: {
          inDropdown: false,
          options: ['unordered', 'ordered'],
          // unordered: { icon: unordered},
          // ordered: { icon: ordered}
        },
      }}
    />
  </div>;
};


export default Notes;
