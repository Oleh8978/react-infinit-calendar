import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

interface IProps {
  setTextFromChildNotesComp: (txt: string) => void;
  textFromNotes: any;
}

const Notes: React.FC<IProps> = ({ ...props }) => {
  const [defaultText, setDefaultText] = useState<any>('hello');

  useEffect(() => {
    if (props.textFromNotes !== undefined) {
      console.log(props.textFromNotes)
    }
  }, [props.textFromNotes]);

  const onEditorStateChange = (textState) => {
    props.setTextFromChildNotesComp(textState);
  };

  const data = EditorState.createWithContent(
    ContentState.createFromText(defaultText),
  );

  return (
    <div className={'notes'}>
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
