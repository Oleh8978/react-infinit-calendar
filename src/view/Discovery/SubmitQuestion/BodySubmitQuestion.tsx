import React, { useState, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

// components
import SelectBox from '@app/component/Dropdown/Dropdown';

// interfaces 
import { ArticleDTO } from '@ternala/frasier-types';

interface IProps {
  isDropdownError: boolean;
  isTextareaError: boolean;
  nameError: string;
  setTextareaValueText: (text: any) => void;
  textareaValue: string;
  setDropdownValueText: (text: any) => void;
  itemsArticle: ArticleDTO[];
  topicListLoader: boolean;
  entryErrorUnsetter: () => void;
}

const BodySubmitQuestion: React.FC<IProps> = ({ ...props }) => {
  const [selectText, setSelectText] = useState<any>('');
  const [isDropdownError, setIsDropdownError] = useState<boolean>(
    props.isDropdownError,
  );

  const setTextFromDropdown = (text: any) => {
    props.setDropdownValueText(text);
    props.entryErrorUnsetter();
  };

  const setTextFromTextarea = (e) => {
    props.setTextareaValueText(e.target.value);
    props.entryErrorUnsetter();
  };

  const checkErrorClass = (errorField: boolean) => {
    if (errorField && props.nameError) {
      return <p className="error-message">{props.nameError}</p>;
    }
    return;
  };

  return (
    <div className="ask-question-body">
      <div className="ask-question-select">
        <SelectBox
          items={props.itemsArticle ? props.itemsArticle : []}
          value={selectText}
          setTextFromDropdown={setTextFromDropdown}
          isDropdownError={props.isDropdownError}
          topicListLoader={props.topicListLoader}
        />
        {checkErrorClass(props.isDropdownError)}
      </div>
      <div className="ask-question-textarea-wrapper">
        <TextareaAutosize
          placeholder={'Type here your question'}
          cacheMeasurements
          value={props.textareaValue}
          onChange={setTextFromTextarea}
          className={`ask-question-textarea ${
            props.isTextareaError ? 'error' : ''
          }`}
        />
        {checkErrorClass(props.isTextareaError)}
      </div>
    </div>
  );
};

export default BodySubmitQuestion;
