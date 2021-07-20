import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

// components
import NavigationBar from '@app/component/NavigationBar';
import BottomComponent from './Bottom';
import ModalWindow from '@app/component/modalWindow/modalWindow';

// actions
import {
  getNoteByID,
  deleteNoteByID,
  updateNoteByID,
} from '@app/controller/singleNote/actions';

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
  const [noteData, setNoteData] = useState<any>(undefined);
  const dispatch = useDispatch();
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

    if (!isReadOnly) {
      setIsToolbarOpened(true);
    } else {
      setIsToolbarOpened(false);
    }
  }, [text, isSaveActive, prevText, isReadOnly]);

  useEffect(() => {
    if (props.note.id === undefined) {
      dispatch(getNoteByID.request({ id: props.match.params.id }));
    }

    if (props.note !== undefined) {
      setNoteData(props.note);
    }
  }, [props.note.id]);
  // console.log('props note ', props.note);
  const onEditorStateChange = (textState) => {
    setText(textState);
    // console.log(JSON.stringify(convertToRaw(textState.getCurrentContent())));
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
          if (item.match(/\"(text)\"\:\"(.*?)\"/g).length > 9) {
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
    setIsModalOpened(false);
    setPrevText(text);
    saveBtnBackEndFunctionality(text);
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

  const saveBtnBackEndFunctionality = (text) => {
    // console.log(emptyValueChecker(text));
    // console.log(
    //   'text ',
    //   String(JSON.stringify(convertToRaw(text.getCurrentContent())).replace(/"/g, "'")),
    // );
    if (emptyValueChecker(text) === false) {
      // console.log('inn', text)
      dispatch(
        updateNoteByID.request({
          content: String(JSON.stringify(convertToRaw(text.getCurrentContent())).replace(/"/g, "'")),
          module: props.note.module.id,
          user: props.user,
          id: props.note.id,
        }),
      );
    } else {
      // console.log('elxe', text)
      dispatch(deleteNoteByID.request([Number(props.note.id)]));
    }
  };

  const saveBtnFunctionality = () => {
    setPrevText(text);
    setIsReadOnly(true);
    setIsSaveActive(false);
    emptyValueChecker(text);
    saveBtnBackEndFunctionality(text);
  };
  console.log('text from note details ', text)
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
      <div
        className={`notes-details-wrapper ${isToolbarOpened ? '' : 'closed'}`}>
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
  );
};

// export default NoteDetails;

export default connect(
  (state: IStore) => ({
    note: state.singleNoteReducer.state,
    loader: state.singleNoteReducer.loaderState.status,
    user: state.authState.user.id,
  }),
  { getNoteByID },
)(NoteDetails);
