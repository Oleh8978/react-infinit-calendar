import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

// components
import SelectBox from 'Component/Dropdown/Dropdown';

interface IProps {}

const items = [
  {
    value: 'The first question',
    id: 1,
  },
  {
    value: 'The second question',
    id: 2,
  },
  {
    value: 'The third question',
    id: 3,
  },
];

const BodySubmitQuestion: React.FC<IProps> = () => {
  const [text, setText] = useState<string>('');
  return (
    <div className="ask-question-body">
      <SelectBox items={items} />
      <TextareaAutosize
        cacheMeasurements
        value={text}
        onChange={(ev) => setText(ev.target.value)}
      />
    </div>
  );
};

export default BodySubmitQuestion;
