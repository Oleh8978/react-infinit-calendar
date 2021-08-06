import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import _ from 'lodash';

// components
import NavigationBar from '@app/component/NavigationBar';
import BottomComponent from './Bottom';
import ModalWindow from '@app/component/modalWindow/modalWindow';
import Loader from '@app/component/Loader';

// actions
import {
  getNoteByID,
  deleteNoteByID,
  updateNoteById,
} from '@app/controller/singleNote/actions';
import { updateNoteByID } from '@app/controller/notes/actions';
import { setSaveBTNStatus } from '@app/controller/saveBTN/actions';
import { setLocalDataForNote } from '@app/controller/sendNoteReducer/actions';
import { setModalWindowOpened } from '@app/controller/modalWindowReducer/actions';
import { sendNoteAction } from '@app/controller/sendNoteReducer/actions';
import { setLocalDataForNotePrevState } from '@app/controller/previouseNoteText/actions';

// types
import { Pages } from '@app/routing/schema';

// interfaces
import { IStore } from '@app/controller/model';

// static
import { styleMap } from './static';

import { datdDraft } from '../fakeData/fakeData';

interface IProps {}

const NoteDetails: React.FC<any> = ({ ...props }) => {
  const noteDetails: Pages = 'notes';
  const [text, setText] = useState<any | undefined>(undefined);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const [isSaveActive, setIsSaveActive] = useState<boolean>(false);
  const [isBtnSaveActive, setIsBtnSaveActive] = useState<boolean>(false);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isToolbarOpened, setIsToolbarOpened] = useState<boolean>(false);
  const [noteData, setNoteData] = useState<any>(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      text !== undefined &&
      props.prevText.contnet !== undefined &&
      _.isEqual(
        props.prevText.contnet.replace(/[^\w\s]/gi, ''),
        JSON.stringify(convertToRaw(text.getCurrentContent())).replace(
          /[^\w\s]/gi,
          '',
        ),
      ) === false
    ) {
      dispatch(setSaveBTNStatus({ isActive: true }));
    } else {
      dispatch(setSaveBTNStatus({ isActive: false }));
    }

    if (!isReadOnly) {
      setIsToolbarOpened(true);
    } else {
      setIsToolbarOpened(false);
    }
  }, [text, isSaveActive, props.prevText, isReadOnly, props.saveBtnStatus]);

  useEffect(() => {
    if (text === undefined) {
      dispatch(getNoteByID.request({ id: props.match.params.id }));
    }
    if (props.note !== undefined && props.note.id !== undefined) {
      setNoteData(props.note);
      setText(
        EditorState.createWithContent(
          convertFromRaw(
            JSON.parse(String(props.note.content).replace(/'/g, '"')),
          ),
        ),
      );
      dispatch(
        props.setLocalDataForNotePrevState({
          contnet: String(props.note.content).replace(/'/g, '"'),
        }),
      );
    }
  }, [props.note.id]);

  const onEditorStateChange = (textState) => {
    setText(textState);
    if (noteData !== undefined) {
      props.setLocalDataForNote({
        content: JSON.stringify(
          convertToRaw(textState.getCurrentContent()),
        ).replace(/"/g, "'"),
        module: noteData.module.id,
        user: noteData.user.id,
        id: props.match.params.id,
      });
    }
  };

  const setIsEditable = () => {
    setIsReadOnly(!isReadOnly);
    setIsSaveActive(!isSaveActive);
  };

  const emptyValueChecker = (text) => {
    const matchedData = JSON.stringify(
      convertToRaw(text.getCurrentContent()),
    ).match(/\"(text)\"\:\"(.*?)\"/g);
    if (
      matchedData
        .filter((item) => item.match(/:"(.*)"/g))
        .map((item) => {
          if (item.length > 9) {
            return true;
          }
        })
        .filter((item) => item === true).length !== 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const save = () => {
    setIsReadOnly(true);
    setIsSaveActive(false);
    dispatch(
      setLocalDataForNotePrevState({
        contnet: JSON.stringify(convertToRaw(text.getCurrentContent())).replace(
          /"/g,
          "'",
        ),
      }),
    );
    dispatch(setSaveBTNStatus({ isActive: false }));
    saveBtnBackEndFunctionality(text);
    dispatch(setModalWindowOpened({ status: false }));
  };

  const discard = () => {
    setIsReadOnly(true);
    setIsSaveActive(false);
    if (props.prevText.contnet !== undefined) {
      setText(
        EditorState.createWithContent(
          convertFromRaw(
            JSON.parse(String(props.prevText.contnet).replace(/'/g, '"')),
          ),
        ),
      );
      // setText(props.prevText.contnet);
    }
    dispatch(setSaveBTNStatus({ isActive: false }));
    dispatch(setModalWindowOpened({ status: false }));
  };

  const modalToogle = () => {
    setIsModalOpened(!isModalOpened);
  };

  const saveBtnBackEndFunctionality = (text) => {
    // console.log('inn valuechecker ', emptyValueChecker(text));
    // console.log('JSON  ', String(
    //   JSON.stringify(convertToRaw(text.getCurrentContent())).replace(
    //     /"/g,
    //     "'",
    //   ),
    // ));

    if (emptyValueChecker(text) === false) {
      dispatch(
        updateNoteById.request({
          content: String(
            JSON.stringify(convertToRaw(text.getCurrentContent())).replace(
              /"/g,
              "'",
            ),
          ),
          module: props.note.module.id,
          user: props.user,
          id: props.note.id,
        }),
      );
      dispatch(
        updateNoteByID({
          content: String(
            JSON.stringify(convertToRaw(text.getCurrentContent())).replace(
              /"/g,
              "'",
            ),
          ),
          module: props.note.module.id,
          user: props.user,
          id: props.note.id,
        }),
      );
    } else {
      dispatch(deleteNoteByID.request([Number(props.note.id)]));
    }
  };

  const saveBtnFunctionality = () => {
    dispatch(
      setLocalDataForNotePrevState({
        contnet: EditorState.createWithContent(
          convertFromRaw(JSON.parse(String(text).replace(/'/g, '"'))),
        ),
      }),
    );
    // setPrevText(text);
    setIsReadOnly(true);
    setIsSaveActive(false);
    emptyValueChecker(text);
    saveBtnBackEndFunctionality(text);
  };

  return (
    <>
      {text ? (
        <div className={'notes'}>
          {props.modalWindowState ? (
            <ModalWindow save={save} discard={discard} />
          ) : (
            <> </>
          )}
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
          <div
            className={`notes-details-wrapper ${
              isToolbarOpened ? '' : 'closed'
            }`}>
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
                  moduleId={25}
                />
              </div>
            </>
          </div>
        </div>
      ) : (
        <>
          <Loader isSmall={false} />
        </>
      )}
    </>
  );
};

export default connect(
  (state: IStore) => ({
    note: state.singleNoteReducer.state,
    loader: state.singleNoteReducer.loaderState.status,
    user: state.authState.user.id,
    notes: state.moduleState.moduleData,
    modalWindowState: state.ModalWindowReducer.status,
    prevText: state.notePrevStateReducer.state,
    saveBtnStatus: state.saveBtnReducer.isActive,
  }),
  {
    getNoteByID,
    updateNoteById,
    setSaveBTNStatus,
    setLocalDataForNote,
    setLocalDataForNotePrevState,
  },
)(NoteDetails);
