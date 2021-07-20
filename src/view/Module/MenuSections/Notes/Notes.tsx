import React, { useState, useEffect } from 'react';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

// components
import ModalWindow from '@app/component/modalWindow/modalWindow';

// static
import * as menuConstats from '../../constants';

interface IProps {
  setTextFromChildNotesComp?: (txt: string) => void;
  textFromNotes?: any;
}

const Notes: React.FC<IProps> = ({ ...props }) => {
  const [isSaveBTNActive, setIsSaveBTNActive] = useState<boolean>(false);
  const [isBtnSaveActive, setIsBtnSaveActive] = useState<boolean>(false);
  const [modalWidowIsOpened, setModalWidowIsOpened] = useState<boolean>(false);
  const [prevText, setPrevText] = useState<any | undefined>(
    // EditorState.createWithContent(ContentState.createFromText('Type...')),
    EditorState.createWithContent(
      convertFromRaw(JSON.parse(menuConstats.defaultTXT)),
    ),
  );
  const [textFromNotes, setTextFromNotes] = useState<any | undefined>(
    // EditorState.createWithContent(ContentState.createFromText('Type...')),
    EditorState.createWithContent(
      convertFromRaw(JSON.parse(menuConstats.defaultTXT)),
    ),
  );

  useEffect(() => {
    if (!textFromNotes) {
      setTextFromNotes(
        EditorState.createWithContent(ContentState.createFromText('')),
      );
    }

    if (
      JSON.stringify(convertToRaw(textFromNotes.getCurrentContent())) !==
      JSON.stringify(convertToRaw(prevText.getCurrentContent()))
    ) {
      setIsBtnSaveActive(true);
    } else {
      setIsBtnSaveActive(false);
    }
  }, [textFromNotes, isBtnSaveActive, modalWidowIsOpened]);

  const save = () => {
    setModalWidowIsOpened(false);
    setIsBtnSaveActive(false);
    setPrevText(textFromNotes);
  };

  const discard = () => {
    setModalWidowIsOpened(false);
    setIsBtnSaveActive(false);
    setTextFromNotes(prevText);
  };

  const saveBtnFunctionality = () => {
    setIsBtnSaveActive(false);
    setPrevText(textFromNotes);
  };

  const openWindow = () => {
    setModalWidowIsOpened(!modalWidowIsOpened);
  };

  const onEditorStateChange = (textState) => {
    setTextFromNotes(textState);
  };

  return (
    <div className={'notes-module'}>
      {modalWidowIsOpened ? (
        <ModalWindow save={save} discard={discard} />
      ) : (
        <> </>
      )}
      <Editor
        defaultEditorState={props.textFromNotes}
        onEditorStateChange={onEditorStateChange}
        editorState={props.textFromNotes}
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
