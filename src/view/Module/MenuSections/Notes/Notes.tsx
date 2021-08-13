import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from 'draft-js';
import _ from 'lodash';
import { Editor } from 'react-draft-wysiwyg';

// components
import ModalWindow from '@app/component/modalWindow/modalWindow';

// interfaces
import { IStore } from '@app/controller/model';

// actions
import { setSaveBTNStatus } from '@app/controller/saveBTN/actions';
import { setLocalDataForNote } from '@app/controller/sendNoteReducer/actions';
import { setModalWindowOpened } from '@app/controller/modalWindowReducer/actions';
import { sendNoteAction } from '@app/controller/sendNoteReducer/actions';
import { setLocalDataForNotePrevStateModule } from '@app/controller/previouseNoteTextModule/actions';

// static
import * as menuConstats from '../../constants';

interface IProps {
  setTextFromChildNotesComp?: (txt: string) => void;
  textFromNotes?: any;
}

const Notes: React.FC<any> = ({ ...props }) => {
  const dispatch = useDispatch();
  const [textFromNotes, setTextFromNotes] = useState<any | undefined>(
    EditorState.createWithContent(
      convertFromRaw(JSON.parse(menuConstats.defaultTXT)),
    ),
  );

  useEffect(() => {
    if (
      props.prevText &&
      props.prevText.contnet !== undefined &&
      _.isEqual(
        // .replace(/[^\w\s]/gi, '')
        props.prevText.contnet,
        JSON.stringify(convertToRaw(textFromNotes.getCurrentContent())),
      ) === false
    ) {
      dispatch(setSaveBTNStatus({ isActive: true }));
    } else {
      dispatch(setSaveBTNStatus({ isActive: false }));
    }

    if (props.prevText === undefined) {
      dispatch(
        setLocalDataForNotePrevStateModule({
          contnet: String(
            JSON.stringify(convertToRaw(textFromNotes.getCurrentContent())),
          ),
        }),
      );
    }
  }, [textFromNotes, props.prevText]);

  const save = () => {
    dispatch(
      setLocalDataForNotePrevStateModule({
        contnet: String(
          JSON.stringify(convertToRaw(textFromNotes.getCurrentContent())),
        ),
      }),
    );
    dispatch(setModalWindowOpened({ status: false }));
    dispatch(
      sendNoteAction.request({
        content: props.noteData.content,
        module: props.noteData.module,
        user: props.noteData.user,
      }),
    );
    dispatch(setSaveBTNStatus({ isActive: false }));
  };

  const discard = () => {
    console.log('fail ', props.prevText.contnet)
    if (props.prevText.contnet !== undefined) {
      setTextFromNotes(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.prevText.contnet)),
        ),
      );
    }
    dispatch(setModalWindowOpened({ status: false }));
  };

  const onEditorStateChange = (textState) => {
    setTextFromNotes(textState);
    if (props.user !== undefined && props.notes !== undefined) {
      props.setLocalDataForNote({
        content: JSON.stringify(
          convertToRaw(textState.getCurrentContent()),
        ),
        module: Number(Object.keys(props.notes)[0]),
        user: props.user.id,
      });
    }
  };

  return (
    <div className={'notes-module'} id="module-notes">
      {props.modalWidowIsOpened ? (
        <ModalWindow save={save} discard={discard} />
      ) : (
        <> </>
      )}
      <Editor
        defaultEditorState={textFromNotes}
        onEditorStateChange={onEditorStateChange}
        editorState={textFromNotes}
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

export default connect(
  (state: IStore) => ({
    isBtnSaveActive: state.saveBtnReducer.isActive,
    user: state.authState.user,
    notes: state.moduleState.moduleData,
    modalWidowIsOpened: state.ModalWindowReducer.status,
    noteData: state.noteLocalDataCollectorReducer.state,
    prevText: state.notePrevStateReducerModule.state,
  }),
  {
    setLocalDataForNote,
    setLocalDataForNotePrevStateModule,
    setModalWindowOpened,
  },
)(Notes);
