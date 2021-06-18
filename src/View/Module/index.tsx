import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

// custom components
import NavigationBar from 'Component/NavigationBar';

import { getModuleAction } from '../../Controller/module/actions';
import { getLoader, getModules } from '../../Controller/module';
import { LoaderAction } from '../../Config/constants';
import Loader from '../../Component/Loader';

interface IProps extends RouteComponentProps<{ id: string }> {}

const Module: React.FC<IProps> = (props) => {
  const { id } = props.match.params;
  const idNumber = Number(id);

  const modules = useSelector(getModules);
  const loaders = useSelector(getLoader);

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
        rout={'/schedule'}
        name={modules[idNumber]?.title}
        page={'schedule'}
        // isNotes={isNotes}
        isSaveActive={true}
        // isBtnSaveActive={isBtnSaveActive}
        // modalToogle={openWindow}
        // saveBtnFunctionality={saveBtnFunctionality}
      />
      {console.log(loaders)}
      {loaders.filter(item => item.type === LoaderAction.module.getModule).length > 0 ? (
        <Loader isSmall={true} />
      ) : (<div className={'module-body'}>{props.children}</div>)}

    </div>
  );
};

export default Module;
