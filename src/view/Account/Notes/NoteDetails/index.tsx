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
import moment from 'moment';

// history
import history from '@app/historyApi';

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
import {
  updateNoteByID,
  singleNoutesRemoveFromList,
} from '@app/controller/notes/actions';
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
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isToolbarOpened, setIsToolbarOpened] = useState<boolean>(false);
  const [noteData, setNoteData] = useState<any>(undefined);
  const [date, setDate] = useState<any>('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      text !== undefined &&
      props.prevText &&
      props.prevText.content !== undefined &&
      _.isEqual(
        props.prevText.content,
        JSON.stringify(convertToRaw(text.getCurrentContent())),
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

      setText(
        EditorState.createWithContent(convertFromRaw(JSON.parse(datdDraft))),
      );
    }
    if (props.note !== undefined && props.note.id !== undefined) {
      setNoteData(props.note);
      setDate(moment(new Date(props.note.createdAt)).format('MM/DD/YYYY'));
      setText(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.note.content)),
        ),
      );
      dispatch(
        setLocalDataForNotePrevState({
          content: `${props.note.content}`,
        }),
      );
    }
  }, [props.note.id]);

  const onEditorStateChange = (textState) => {
    setText(textState);
    if (noteData !== undefined) {
      props.setLocalDataForNote({
        content: JSON.stringify(convertToRaw(textState.getCurrentContent())),
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
    const matchedData = text.replace(/'/g, '"').match(/\"(text)\"\:\"(.*?)\"/g);
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
    if (props.current && props.current.content) {
      dispatch(
        setLocalDataForNotePrevState({
          content: `${props.current.content}`,
        }),
      );

      setText(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(`${props.current.content}`)),
        ),
      );
    }

    dispatch(setSaveBTNStatus({ isActive: false }));
    saveBtnBackEndFunctionality(
      JSON.stringify(convertToRaw(text.getCurrentContent())),
    );
    dispatch(setModalWindowOpened({ status: false }));
  };

  const discard = () => {
    setIsReadOnly(true);
    setIsSaveActive(false);
    if (props.prevText.content !== undefined) {
      setText(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(`${props.prevText.content}`)),
        ),
      );
    }
    dispatch(setSaveBTNStatus({ isActive: false }));
    dispatch(setModalWindowOpened({ status: false }));
  };

  const modalToogle = () => {
    setIsModalOpened(!isModalOpened);
  };

  const saveBtnBackEndFunctionality = (text) => {
    if (emptyValueChecker(text) === false) {
      dispatch(
        updateNoteById.request({
          content: String(text),
          module: props.note.module.id,
          user: props.user,
          id: props.note.id,
        }),
      );
      dispatch(
        updateNoteByID({
          content: text,
          module: props.note.module.id,
          user: props.user,
          id: props.note.id,
        }),
      );
    } else {
      dispatch(singleNoutesRemoveFromList({ id: Number(props.note.id) }));
      dispatch(deleteNoteByID.request([Number(props.note.id)]));
      history.push('/notes');
    }
  };

  const saveBtnFunctionality = () => {
    if (emptyValueChecker(text) === false) {
      setText(
        EditorState.createWithContent(convertFromRaw(JSON.parse(datdDraft))),
      );
    }
    dispatch(
      setLocalDataForNotePrevState({
        content: String(text),
      }),
    );
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
            name={`${date}`}
            isNotes={true}
            page={noteDetails}
            setIsEditable={setIsEditable}
            isSaveActive={isSaveActive}
            modalToogle={modalToogle}
            saveBtnFunctionality={saveBtnFunctionality}
          />
          <div
            className={`notes-details-wrapper ${
              isToolbarOpened ? '' : 'closed'
            }`}>
            <>
              {text !== undefined ? (
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
              ) : (
                <></>
              )}
              <div className="notes-details-wrapper-bottom">
                {props.module && props.module.title && (
                  <BottomComponent
                    title={`${props.module.title}`}
                    subtitle={''}
                    moduleId={props.module.id}
                  />
                )}
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
    module: state.singleNoteReducer.state.module,
    loader: state.singleNoteReducer.loaderState.status,
    user: state.authState.user.id,
    notes: state.moduleState.moduleData,
    modalWindowState: state.ModalWindowReducer.status,
    prevText: state.notePrevStateReducer.state,
    saveBtnStatus: state.saveBtnReducer.isActive,
    current: state.noteLocalDataCollectorReducer.state,
  }),
  {
    getNoteByID,
    updateNoteById,
    setSaveBTNStatus,
    setLocalDataForNote,
    setLocalDataForNotePrevState,
    singleNoutesRemoveFromList,
  },
)(NoteDetails);
