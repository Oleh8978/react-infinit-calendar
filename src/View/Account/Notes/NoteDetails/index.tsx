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
import ModalWindow from 'Component/modalWindow/modalWindow';

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
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isToolbarOpened, setIsToolbarOpened] = useState<boolean>(false);
  // const [emptyState, setEmptyState] = useState<any>(EditorState.createEmpty());

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

    if(!isReadOnly) {
      setIsToolbarOpened(true);
    } else {
      setIsToolbarOpened(false);
    }
  }, [text, isSaveActive, prevText, isReadOnly]);

  const onEditorStateChange = (textState) => {
    setText(textState);
    // console.log(JSON.stringify(convertToRaw(textState.getCurrentContent())));
  };

  const setIsEditable = () => {
    setIsReadOnly(!isReadOnly);
    setIsSaveActive(!isSaveActive);
  };

  const save = () => {
    setIsReadOnly(true);
    setIsSaveActive(false);
    setIsModalOpened(false);
    setPrevText(text);
  };

  const discard = () => {
    setIsReadOnly(true);
    setIsSaveActive(false);
    setIsModalOpened(false);
    setText(
      EditorState.createWithContent(convertFromRaw(JSON.parse(datdDraft))),
    );
  };

  const modalToogle = () => {
    setIsModalOpened(!isModalOpened);
  };

  const saveBtnFunctionality = () => {
    setPrevText(text);
    setIsReadOnly(true);
    setIsSaveActive(false);
  };

  return (
    <div className={'notes'}>
      {isModalOpened ? <ModalWindow save={save} discard={discard} /> : <> </>}
      <NavigationBar
        name={'date'}
        isNotes={true}
        page={noteDetails}
        setIsEditable={setIsEditable}
        isSaveActive={isSaveActive}
        isBtnSaveActive={isBtnSaveActive}
        modalToogle={modalToogle}
        saveBtnFunctionality={saveBtnFunctionality}
      />
      <div className={`notes-details-wrapper ${isToolbarOpened ? '' : 'closed'}`}>
        <>
          <Editor
            customStyleMap={styleMap}
            defaultEditorState={text}
            onEditorStateChange={onEditorStateChange}
            toolbarOnFocus
            readOnly={isReadOnly}
            editorState={text}
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
