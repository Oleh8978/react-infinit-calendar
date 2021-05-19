import React, { useState, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

// components
import SelectBox from 'Component/Dropdown/Dropdown';

interface IProps {
  isDropdownError: boolean;
  isTextareaError: boolean;
  nameError: string;
  setTextareaValueText: (text: any) => void;
  textareaValue: string;
  setDropdownValueText: (text: any) => void;
}

const items = [
  {
    value: 'Category Name 1',
    id: 1,
  },
  {
    value: 'Category Name 2',
    id: 2,
  },
  {
    value: 'Category Name 3',
    id: 3,
  },
];

const BodySubmitQuestion: React.FC<IProps> = ({ ...props }) => {
  const [selectText, setSelectText] = useState<any>('');
  const [isDropdownError, setIsDropdownError] = useState<boolean>(props.isDropdownError);

  const setTextFromDropdown = (text: any) => {
    props.setDropdownValueText(text);
  };

  const setTextFromTextarea = (e) => {
    props.setTextareaValueText(e.target.value);
  };

  const checkErrorClass = (errorField: boolean) => {
    if(errorField && props.nameError) {
      return <p className="error-message">{props.nameError}</p>
    }
    return;
  };

  return (
    <div className='ask-question-body'>
      <div className='ask-question-select'>
        <SelectBox items={items} value={selectText} setTextFromDropdown={setTextFromDropdown}
                   isDropdownError={props.isDropdownError}/>
        {checkErrorClass(props.isDropdownError)}
      </div>
      <div className='ask-question-textarea-wrapper'>
        <TextareaAutosize
          placeholder={'Type here your question'}
          cacheMeasurements
          value={props.textareaValue}
          onChange={setTextFromTextarea}
          className={`ask-question-textarea ${props.isTextareaError ? 'error' : ''}`}
        />
        {checkErrorClass(props.isTextareaError)}
      </div>
    </div>
  );
};

export default BodySubmitQuestion;
