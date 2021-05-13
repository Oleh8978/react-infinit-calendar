import React, { useState, useEffect } from 'react';

// components
import NavigationBar from 'Component/NavigationBar';
import BodySubmitQuestion from './BodySubmitQuestion';
import ButtonSubmit from './SubmitBTN';
import ModalWindowThanks from './ModalWindow';

interface IProps {}

const SubmitQuestion: React.FC<IProps> = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const submitFunc = () => {
    setIsModal(true);
  };

  return (
    <div className="ask-question">
      <NavigationBar name={''} rout={'/discovery'} hasSaveButton={false} />
      <div className="ask-question-header">
        <span className="ask-question-header-text__first">
          What question would you like to have an answer from us?
        </span>
        <span className="ask-question-header-text__second">
          One question per form submission
        </span>
      </div>
      <BodySubmitQuestion />
      <div className="ask-question__bottom">
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
