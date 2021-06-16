import React, { useState, useEffect } from 'react';
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';

import { RouteComponentProps } from 'react-router-dom';

// custom components
import NavigationBar from 'Component/NavigationBar';
import NavigationMenu from './Menu';
import ModalWindow from 'Component/modalWindow/modalWindow';

// constants
import * as menuConstats from './constants';

// history
import history from 'historyApi';

// interfaces
import { INavigationMenu } from './Models';
import { isTypeNode } from 'typescript';

// helpers 
import { styleBTNSetter } from 'Utils/navigationButtonsStyler';
import { getModuleAction } from '../../Controller/module/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getModules } from '../../Controller/module';

interface IProps extends RouteComponentProps<{ id: string }> {}

const Module: React.FC<IProps> = (props) => {
  const { id } = props.match.params;
  const idNumber = Number(id);

  const modules = useSelector(getModules);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getModuleAction.request({
        id: idNumber,
      }),
    );
  }, []);

  // const [isSaveBTNActive, setIsSaveBTNActive] = useState<boolean>(false);
  // const [isBtnSaveActive, setIsBtnSaveActive] = useState<boolean>(false);
  // const [modalWidowIsOpened, setModalWidowIsOpened] = useState<boolean>(false);
  // const [prevText, setPrevText] = useState<any | undefined>(
  //   // EditorState.createWithContent(ContentState.createFromText('Type...')),
  //   EditorState.createWithContent(
  //     convertFromRaw(JSON.parse(menuConstats.defaultTXT)),
  //   ),
  // );
  // const [textFromNotes, setTextFromNotes] = useState<any | undefined>(
  //   // EditorState.createWithContent(ContentState.createFromText('Type...')),
  //   EditorState.createWithContent(
  //     convertFromRaw(JSON.parse(menuConstats.defaultTXT)),
  //   ),
  // );
  // const [isNotes, setIsNotes] = useState<boolean>(false);
  // const [rout, seRout] = useState<string>('schedule');
  //
  // const setIsclicked = (name: string) => {
  //   const arr = [...menuItems];
  //   arr.map((item: INavigationMenu) => {
  //     if (item.name === 'Notes' && isSaveBTNActive && item.isActive) {
  //       setModalWidowIsOpened(true);
  //     } else {
  //       if (item.name === name) {
  //         item.isActive = true;
  //       } else {
  //         item.isActive = false;
  //       }
  //     }
  //   });
  //   setMenuItems(arr);
  // };
  //
  // useEffect(() => {
  //   addSavedBTN();
  //
  //   if (!textFromNotes) {
  //     setTextFromNotes(
  //       EditorState.createWithContent(ContentState.createFromText('')),
  //     );
  //   }
  //
  //   if (
  //     JSON.stringify(convertToRaw(textFromNotes.getCurrentContent())) !==
  //     JSON.stringify(convertToRaw(prevText.getCurrentContent()))
  //   ) {
  //     setIsBtnSaveActive(true);
  //   } else {
  //     setIsBtnSaveActive(false);
  //   }
  // }, [menuItems, textFromNotes, isBtnSaveActive, modalWidowIsOpened]);
  //
  // const addSavedBTN = () => {
  //   menuItems.map((item) => {
  //     if (item.name === 'Notes' && item.isActive === true) {
  //       setIsNotes(true);
  //       seRout('module');
  //     } else {
  //       setIsNotes(false);
  //       seRout('schedule');
  //     }
  //   });
  // };
  //
  // const setTextFromChildNotesCop = (txt: string): void => {
  //   setTextFromNotes(txt);
  // };
  //
  // const save = () => {
  //   setModalWidowIsOpened(false);
  //   setIsBtnSaveActive(false);
  //   setPrevText(textFromNotes);
  // };
  //
  // const discard = () => {
  //   setModalWidowIsOpened(false);
  //   setIsBtnSaveActive(false);
  //   setTextFromNotes(prevText);
  // };
  //
  // const saveBtnFunctionality = () => {
  //   setIsBtnSaveActive(false);
  //   setPrevText(textFromNotes);
  // }
  //
  // const openWindow = () => {
  //   setModalWidowIsOpened(!modalWidowIsOpened);
  // };

  return (
    <div className={'module'}>
      {/*{modalWidowIsOpened ? (*/}
      {/*  <ModalWindow save={save} discard={discard} />*/}
      {/*) : (*/}
      {/*  <> </>*/}
      {/*)}*/}
      <NavigationBar
        rout={'schedule'}
        name={modules[idNumber]?.title}
        page={'schedule'}
        // isNotes={isNotes}
        isSaveActive={true}
        // isBtnSaveActive={isBtnSaveActive}
        // modalToogle={openWindow}
        // saveBtnFunctionality={saveBtnFunctionality}
      />
      <div className={'module-body'}>{props.children}</div>
    </div>
  );
};

export default Module;