import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import { RouteComponentProps } from 'react-router-dom';

// custom components
import NavigationBar from 'Component/NavigationBar';
import NavigationMenu from './Menu';
import ModulePage from './ModulePage';

// constants
import * as menuConstats from './constants';

// history
import history from 'historyApi';

// interfaces
import { INavigationMenu } from './Models';
import { isTypeNode } from 'typescript';

interface IProps extends RouteComponentProps {}

const Module: React.FC<IProps> = () => {
  const [menuItems, setMenuItems] = useState<INavigationMenu[]>(
    menuConstats.menuOptions,
  );
  const [hasSaveButton, setHasSaveButton] = useState<boolean>(false);
  const [isSaveBTNActive, setIsSaveBTNActive] = useState<boolean>(false);
  const [modalWidowIsOpened, setModalWidowIsOpened] = useState<boolean>(false);
  const [textFromNotes, setTextFromNotes] = useState<any | undefined>(
    EditorState.createWithContent(ContentState.createFromText('asadsdas'))
  );
  const [rout, seRout] = useState<string>('schedule');

  const setIsclicked = (name: string) => {
    const arr = [...menuItems];
    arr.map((item: INavigationMenu) => {
      if (item.name === 'Notes' && isSaveBTNActive && item.isActive) {
        setModalWidowIsOpened(true);
      } else {
        if (item.name === name) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      }
    });
    setMenuItems(arr);
  };

  useEffect(() => {
    addSavedBTN();
    console.log('textFromNotes ', textFromNotes);

    if (!textFromNotes) {
      setTextFromNotes(
        EditorState.createWithContent(ContentState.createFromText('')),
      );
    }
  }, [menuItems, textFromNotes]);

  const addSavedBTN = () => {
    menuItems.map((item) => {
      if (item.name === 'Notes' && item.isActive === true) {
        setHasSaveButton(true);
        seRout('module');
      } else {
        setHasSaveButton(false);
        seRout('schedule');
      }
    });
  };

  const setActiveBTNFromChild = () => {
    setIsSaveBTNActive(true);
  };

  const setActiveBTNFromChildFalse = () => {
    setIsSaveBTNActive(false);
  };

  const moveBack = () => {
    setIsclicked('Overview');
  };

  const setTextFromChildNotesCop = (txt: string): void => {
    setTextFromNotes(txt);
  };

  const modalWindow = () => {
    return (
      <div className="modalwindow-wrapper">
        <div className="modalwindow">
          <span className='modalwindow-question'>Would you like to save your note?</span>
          <span className='modalwindow-notification'>unsaved changes</span>
          <button className="modalwindow-discard"
            onClick={() => {
              setModalWidowIsOpened(false), setHasSaveButton(false);
            }}>
            Discard
          </button>
          <button className="modalwindow-save"
            onClick={() => {
              setModalWidowIsOpened(false), setHasSaveButton(false);
            }}>
            Save
          </button>
        </div>{' '}
      </div>
    );
  };

  const openWindow = () => {
    setModalWidowIsOpened(!modalWidowIsOpened);
  };
  console.log();
  return (
    <div className={'module'}>
      {/*{modalWidowIsOpened ? modalWindow() : <> </>}*/}
      {modalWidowIsOpened ? modalWindow() : modalWindow()}
      <NavigationBar
        rout={rout}
        name={'Module name '}
        hasSaveButton={hasSaveButton}
        isSaveBTNActive={isSaveBTNActive}
        moveBack={moveBack}
        setModalWidowIsOpened={openWindow}
      />
      <div className={'module-body'}>
        <NavigationMenu menuOptions={menuItems} setIsclicked={setIsclicked} />
        <ModulePage
          menuItems={menuItems}
          setTextFromChildNotesComp={setTextFromChildNotesCop}
          textFromNotes={textFromNotes}
        />
      </div>
    </div>
  );
};

export default Module;
