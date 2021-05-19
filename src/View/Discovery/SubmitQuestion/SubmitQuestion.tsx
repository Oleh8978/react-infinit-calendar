import React, { useState, useEffect } from 'react';

// components
import NavigationBar from 'Component/NavigationBar';
import BodySubmitQuestion from './BodySubmitQuestion';
import ButtonSubmit from './SubmitBTN';
import ModalWindowThanks from './ModalWindow';
import { bindActionCreators } from 'redux';

interface IProps {
}

const SubmitQuestion: React.FC<IProps> = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isDropdownError, setIsDropdownError] = useState<boolean>(false);
  const [isTextareaError, setIsTextareaError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>('');
  const [textareaValue, setTextareaValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');

  const setTextareaValueText = (text: any) => {
    setTextareaValue(text);
  };

  const setDropdownValueText = (text: any) => {
    setDropdownValue(text);
  };

  const isNotValid = () => {
    if(dropdownValue === '' || dropdownValue === undefined || textareaValue === '' || textareaValue === undefined) {
      return true;
    } else {
      return false;
    }
  };

  const formValidation = (): any => {
    if (isNotValid()) {
      if(dropdownValue === '' || dropdownValue === undefined) {
        setIsDropdownError(true);
      } else {
        setIsDropdownError(false);
      }

      if(textareaValue === '' || textareaValue === undefined) {
        setIsTextareaError(true);
      } else {
        setIsTextareaError(false);
      }

      setNameError('This field is required');

      return true;
    } else {
      setNameError(null);
      setIsDropdownError(false);
      setIsTextareaError(false);
      return false;
    }
  };

  const submitFunc = () => {
    setIsModal(formValidation());
  };

  return (
    <div className="ask-question">
      <NavigationBar name={''} rout={'/'} hasSaveButton={false} />
      <div className="ask-question-header">
        <span className="ask-question-header-text__first">
          What question would you like to have an answer from us?
        </span>
        <span className='ask-question-header-text__second'>
          One question per form submission
        </span>
      </div>
      <BodySubmitQuestion isDropdownError={isDropdownError} isTextareaError={isTextareaError} nameError={nameError}
                          setTextareaValueText={setTextareaValueText}
                          textareaValue={textareaValue} setDropdownValueText={setDropdownValueText}/>
      <div className='ask-question__bottom'>
        <ButtonSubmit
          name={'Submit'}
          onClick={submitFunc}
          isActive={isActive}
        />
      </div>
      {isModal ? <ModalWindowThanks /> : <> </>}
    </div>
  );
};

export default SubmitQuestion;
