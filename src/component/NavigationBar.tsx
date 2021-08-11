import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

// components
import Link from '@app/routing/Link';
import Pen from './CustomButtons/Pen';

// types
import { Pages } from '@app/routing/schema';

//actions
import { setSaveBTNStatus } from '@app/controller/saveBTN/actions';
import { sendNoteAction } from '@app/controller/sendNoteReducer/actions';
import { setModalWindowOpened } from '@app/controller/modalWindowReducer/actions';
import {
  deleteNoteByID,
  updateNoteById,
} from '@app/controller/singleNote/actions';
import { setLocalDataForNotePrevState } from '@app/controller/previouseNoteText/actions';
import { setLocalDataForNotePrevStateModule } from '@app/controller/previouseNoteTextModule/actions';
import { getNotesList, singleNoutesRemoveFromList } from '@app/controller/notes/actions';
// localy
import { updateNoteByID } from '@app/controller/notes/actions';

// static
import * as menuConstats from '@app/view/Module/constants';
import { datdDraft } from '@app/view/Account/Notes/fakeData/fakeData';

// interfaces
import { IStore } from '@app/controller/model';

interface IProps {
  rout?: string;
  name: string;
  hasSaveButton?: boolean;
  isSaveBTNActive?: boolean;
  moveBack?: () => void;
  setModalWidowIsOpened?: () => void;
  isNotes?: boolean;
  page?: Pages;
  setIsEditable?: () => void;
  isSaveActive?: boolean;
  isBtnSaveActive?: boolean;
  modalToogle?: () => void;
  saveBtnFunctionality?: () => void;
  isEditProfile?: boolean;
}

const NavigationBar: React.FC<any> = ({ ...props }) => {
  const dispatch = useDispatch();
  const [isNotes, setIsNotes] = useState<boolean>(false);
  const [isNotesID, setIsNotesID] = useState<boolean>(false);
  useEffect(() => {
    if (
      String(props.rout.pathname).match(/note/) !== null &&
      String(String(props.rout.pathname).search(/note/)) !== '-1' &&
      String(String(props.rout.pathname).search(/notes/)) === '-1'
    ) {
      setIsNotes(true);
    } else {
      console.log();
      dispatch(
        setLocalDataForNotePrevStateModule({
          contnet: String(menuConstats.defaultTXT),
        }),
      );
      setIsNotes(false);
    }

    if (String(props.rout.pathname).match(/note-details/) !== null) {
      setIsNotesID(true);
    } else {
      setIsNotesID(false);
    }
  }, [props.rout, props.isBtnSaveActive]);

  const emptyValueChecker = (text) => {
    const matchedData = String(JSON.stringify(text)).match(
      /\"(text)\"\:\"(.*?)\"/g,
    );
    console.log(JSON.parse(text), "@matchedData@")
    if (
      matchedData !== null &&
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

  const sendData = () => {
    if (props.noteData !== undefined) {
      dispatch(
        sendNoteAction.request({
          content: props.noteData.content,
          module: props.noteData.module,
          user: props.noteData.user,
        }),
      );

      dispatch(
        setLocalDataForNotePrevStateModule({
          contnet: props.noteData.content,
        }),
      );
      dispatch(setSaveBTNStatus({ isActive: false }));
    }
  };

  const updateNoteData = () => {
    console.log('props.textFromComponent', props.noteData.content);
    if (emptyValueChecker(props.noteData.content) === false) {
      dispatch(
        updateNoteById.request({
          content: props.noteData.content,
          module: props.noteData.module,
          user: props.noteData.user,
          id: props.noteData.id,
        }),
      );

      dispatch(updateNoteByID({
          content: props.noteData.content,
          module: props.noteData.module,
          user: props.noteData.user,
          id: props.noteData.id,
      }))
      dispatch(
        setLocalDataForNotePrevState({
          content: props.noteData.content,
        }),
      );
      dispatch(setSaveBTNStatus({ isActive: false }));
    } else {
      dispatch(setSaveBTNStatus({ isActive: false }));
      dispatch(setLocalDataForNotePrevState({content: datdDraft}))
      dispatch(singleNoutesRemoveFromList({id:Number(props.note.id)}))
      dispatch(deleteNoteByID.request([Number(props.note.id)]));
    }
  };

  return (
    <>
      {props.isEditProfile ? (
        <>
          <div className={'module-menu'}>
            <div className="module-menu-col1">
              <Link backFlag={true} className="module-menu-back">
                <div className="module-menu-back__top" />
                <div className="module-menu-back__bottom" />
              </Link>
            </div>
            <div className="module-menu-col2">{props.name}</div>
            <div className="module-menu-col3">
              {props.hasSaveButton ? (
                <>
                  <span
                    className={
                      props.isBtnSaveActive ? 'btn-save' : 'btn-save__inactive'
                    }
                    onClick={() => {
                      props.saveBtnFunctionality();
                    }}
                    id="btn-save-click">
                    Save
                  </span>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>{' '}
        </>
      ) : (
        <div className={'module-menu'}>
          <div className="module-menu-col1">
            {isNotesID || isNotes ? (
              <>
                {props.isBtnSaveActive ? (
                  <div
                    className="module-menu-back"
                    onClick={() => {
                      dispatch(
                        setModalWindowOpened({ status: !props.modalOpened }),
                      );
                    }}>
                    <div className="module-menu-back__top" />
                    <div className="module-menu-back__bottom" />
                  </div>
                ) : (
                  <Link backFlag={true} className="module-menu-back">
                    <div className="module-menu-back__top" />
                    <div className="module-menu-back__bottom" />
                  </Link>
                )}
              </>
            ) : (
              <Link backFlag={true} className="module-menu-back">
                <div className="module-menu-back__top" />
                <div className="module-menu-back__bottom" />
              </Link>
            )}
          </div>
          <div className="module-menu-col2">{props.name}</div>

          {isNotesID || isNotes ? (
            <div className="module-menu-col3">
              {props.isSaveActive ? (
                <>
                  {' '}
                  {isNotesID ? (
                    <span
                      className={
                        props.isBtnSaveActive
                          ? 'btn-save'
                          : 'btn-save__inactive'
                      }
                      onClick={
                        props.isBtnSaveActive
                          ? /// here is will be our push method
                            () => updateNoteData()
                          : () => console.log('inactive')
                      }>
                      Save
                    </span>
                  ) : (
                    <span
                      className={
                        props.isBtnSaveActive
                          ? 'btn-save'
                          : 'btn-save__inactive'
                      }
                      onClick={
                        props.isBtnSaveActive
                          ? /// here is will be our push method
                            () => sendData()
                          : () => console.log('inactive')
                      }>
                      Save
                    </span>
                  )}
                </>
              ) : (
                <Pen onClick={props.setIsEditable} />
              )}
            </div>
          ) : (
            <div className="module-menu-col3">
              {props.hasSaveButton ? (
                <>
                  <span
                    className={
                      props.isBtnSaveActive ? 'btn-save' : 'btn-save__inactive'
                    }
                    onClick={
                      props.isBtnSaveActive
                        ? () => props.saveBtnFunctionality()
                        : () => console.log('inactive')
                    }>
                    Save
                  </span>
                </>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default connect(
  (state: IStore) => ({
    rout: state.router.location,
    isBtnSaveActive: state.saveBtnReducer.isActive,
    noteData: state.noteLocalDataCollectorReducer.state,
    note: state.singleNoteReducer.state,
    modalOpened: state.ModalWindowReducer.status,
  }),
  {
    sendNoteAction: sendNoteAction.request,
    setSaveBTNStatus,
    updateNoteByID,
    updateNoteById,
    setLocalDataForNotePrevState,
    setLocalDataForNotePrevStateModule,
    singleNoutesRemoveFromList,
    getNotesList,
  },
)(NavigationBar);
