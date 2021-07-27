import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

// config
import { LoaderAction } from '@app/config/constants';

// custom components
import NavigationBar from '@app/component/NavigationBar';
import Loader from '@app/component/Loader';

// Actions
import { getModuleAction } from '@app/controller/module/actions';

// Selectors
import { getLoader, getModules } from '@app/controller/module';

// View
import TrialExpired from '@app/view/Schedule/TrialExpired/TrialExpired';

type IProps = RouteComponentProps<{ id: string }>;

const Module: React.FC<IProps> = (props) => {
  const { id } = props.match.params;
  const idNumber = Number(id);
  const [isFirstLoaded, setIsFirstLoaded] = useState<boolean>(undefined);

  const modules: any = useSelector(getModules);
  const loaders = useSelector(getLoader);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getModuleAction.request({
        id: idNumber,
      }),
    );
    setIsFirstLoaded(false);
  }, []);

  useEffect(() => {
    if (loaders.length === 0 && isFirstLoaded === false) {
      setIsFirstLoaded(true);
    }
  }, [loaders]);

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
        rout={'/schedule'}
        name={modules[idNumber]?.title}
        page={'schedule'}
        // isNotes={isNotes}
        isSaveActive={true}
        // isBtnSaveActive={isBtnSaveActive}
        // modalToogle={openWindow}
        // saveBtnFunctionality={saveBtnFunctionality}
      />
      <div className="module-content">
        <Scrollbars
          style={{
            width: '100%',
            maxWidth: 639,
            height: '100%',
            maxHeight: '100%',
            display: 'flex',
          }}>
          {modules?.[idNumber]?.isExpired ? (
            <TrialExpired id={modules?.[idNumber]?.journey?.id} />
          ) : (
            <div className={'module-body'}>{props.children}</div>
          )}
        </Scrollbars>
        {isFirstLoaded ? (
          Boolean(
            loaders.filter(
              (item) => item.type === LoaderAction.module.getModule,
            ).length,
          ) && <Loader isSmall={true} isAbsolute={true} />
        ) : (
          <></>
        )}
        {/*<Loader*/}
        {/*  isSmall={true}*/}
        {/*  className={'custom'}*/}
        {/*  isShow={*/}
        {/*    loaders.filter(*/}
        {/*      (item) => item.type === LoaderAction.module.getModule,*/}
        {/*    ).length > 0*/}
        {/*  }*/}
        {/*/>*/}
      </div>
    </div>
  );
};

export default Module;
