import React, { useEffect, useState } from 'react';
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

// components
import NavigationBar from 'Component/NavigationBar';
import BottomComponent from './Bottom';

// types
import { Pages } from 'Routing/schema';

// static
import { styleMap } from './static';

import { datdDraft } from '../fakeData/fakeData';

interface IProps {}

const NoteDetails: React.FC<IProps> = () => {
  const noteDetails: Pages = 'notes';

  const [text, setText] = useState<any | undefined>(
    // EditorState.createWithContent(ContentState.createFromText('Type...')),
    EditorState.createWithContent(convertFromRaw(JSON.parse(datdDraft))),
  );
  const [prevText, setPrevText] = useState<any | undefined>(
    EditorState.createWithContent(convertFromRaw(JSON.parse(datdDraft))),
  );
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const [isSaveActive, setIsSaveActive] = useState<boolean>(false);
  const [isBtnSaveActive, setIsBtnSaveActive] = useState<boolean>(false);

  useEffect(() => {
    if (!text) {
      setText(EditorState.createWithContent(ContentState.createFromText('')));
    }

    if (
      JSON.stringify(convertToRaw(prevText.getCurrentContent())) !==
      JSON.stringify(convertToRaw(text.getCurrentContent()))
    ) {
      setIsBtnSaveActive(true);
    } else {
      setIsBtnSaveActive(false);
    }
  }, [text]);

  const onEditorStateChange = (textState) => {
    setText(textState);
    // console.log(JSON.stringify(convertToRaw(textState.getCurrentContent())));
  };

  const setIsEditable = () => {
    setIsReadOnly(!isReadOnly);
    setIsSaveActive(!isSaveActive);
  };

  return (
    <div className={'notes'}>
      <NavigationBar
        name={'date'}
        isNotes={true}
        page={noteDetails}
        setIsEditable={setIsEditable}
        isSaveActive={isSaveActive}
        isBtnSaveActive={isBtnSaveActive}
      />
      <div className="notes-details-wrapper">
        <>
          <Editor
            customStyleMap={styleMap}
            defaultEditorState={text}
            onEditorStateChange={onEditorStateChange}
            toolbarOnFocus
            readOnly={isReadOnly}
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
          <div className="notes-details-wrapper-bottom">
            <BottomComponent
              title={'Customer Relationship Management'}
              subtitle={'Management | Create List of Calls for the Week '}
            />
          </div>
        </>
      </div>
    </div>
  );
};

export default NoteDetails;
