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
import { updateNoteByID, singleNoutesRemoveFromList } from '@app/controller/notes/actions';
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
      text !== undefined && props.prevText &&
      props.prevText.content !== undefined &&
      _.isEqual(
        String(props.prevText.content).replace(/"/g, "'"),
        JSON.stringify(
            convertToRaw(text.getCurrentContent()),
          ).replace(/"/g, "'")
      ) === false
    ) {
      // console.log("@@@@", String(props.prevText.content).replace(/"/g, "'"))
      // console.log("####", JSON.stringify(
      //   convertToRaw(text.getCurrentContent()),
      // ).replace(/"/g, "'"))
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
      // setText(datdDraft);
      setText(
      EditorState.createWithContent(
          convertFromRaw(
            JSON.parse(String(datdDraft).replace(/'/g, '"')),
          ),
        ),
      );
    }
    if (props.note !== undefined && props.note.id !== undefined) {
      setNoteData(props.note);
      // setText(String(props.note.content).replace(/'/g, '"'))
      setText(
        EditorState.createWithContent(
            convertFromRaw(
              JSON.parse(String(props.note.content).replace(/'/g, '"')),
            ),
          ),
        );
      dispatch(
        setLocalDataForNotePrevState({
          content: String(props.note.content).replace(/'/g, '"'),
        }),
      );
    }
  }, [props.note.id]);

  const onEditorStateChange = (textState) => {
    // console.log('JSON.stringify(textState) ', JSON.parse(textState))
    // console.log('textState.getCurrentContent() ', textState.getCurrentContent())
    // setText(JSON.stringify(
    //   convertToRaw(textState.getCurrentContent()),
    // ).replace(/"/g, "'"));
    setText(textState)
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
    dispatch(
      setLocalDataForNotePrevState({
        content: JSON.stringify(convertToRaw(text.getCurrentContent())).replace(
          /"/g,
          "'",
        ),
      }),
    );
    // dispatch(
    //   updateNoteById.request({
    //     content: String(
    //       JSON.stringify(convertToRaw(text.getCurrentContent())).replace(
    //         /"/g,
    //         "'",
    //       ),
    //     ),
    //     module: props.note.module.id,
    //     user: props.user,
    //     id: props.note.id,
    //   }),
    // );
    dispatch(setSaveBTNStatus({ isActive: false }));
    saveBtnBackEndFunctionality(String(
      JSON.stringify(convertToRaw(text.getCurrentContent())).replace(
        /"/g,
        "'",
      ),
    ));
    dispatch(setModalWindowOpened({ status: false }));
  };

  const discard = () => {
    setIsReadOnly(true);
    setIsSaveActive(false);
    if (props.prevText.content !== undefined) {
      // setText(
        // EditorState.createWithContent(
        //   convertFromRaw(
        //     JSON.parse(String(props.prevText.contnet).replace(/'/g, '"')),
        //   ),
        // ),
      // );
      setText(
        EditorState.createWithContent(
            convertFromRaw(
              JSON.parse(String(props.prevText.content).replace(/'/g, '"')),
            ),
          ),
        );
      // setText(props.prevText.contnet.replace(/"/g, "'"));
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
          content: String(text).replace(
              /"/g,
              "'",
          ),
          module: props.note.module.id,
          user: props.user,
          id: props.note.id,
        }),
      );
      dispatch(
        updateNoteByID({
          // content: String(
          //   JSON.stringify(convertToRaw(text.getCurrentContent())).replace(
          //     /"/g,
          //     "'",
          //   ),
          // ),
          content: text,
          module: props.note.module.id,
          user: props.user,
          id: props.note.id,
        }),
      );
    } else {
      dispatch(singleNoutesRemoveFromList({id:Number(props.note.id)}))
      dispatch(deleteNoteByID.request([Number(props.note.id)]));
    }
  };

  const saveBtnFunctionality = () => {
    if (emptyValueChecker(text) === false ) {
      // setText(EditorState.createWithContent(
      //   convertFromRaw(
      //     JSON.parse(datdDraft),
      //   ),
      // ),)
      // setText(datdDraft.replace(
      //   /"/g,
      //   "'",
      // ))
      setText(
        EditorState.createWithContent(
            convertFromRaw(
              JSON.parse(String(datdDraft).replace(/'/g, '"')),
            ),
          ),
        );
      
    }
      dispatch(
        setLocalDataForNotePrevState({
          content: String(text).replace(
            /"/g,
            "'",
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
              {text !== undefined ? <Editor
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
              /> : <></>}
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
    singleNoutesRemoveFromList
  },
)(NoteDetails);
