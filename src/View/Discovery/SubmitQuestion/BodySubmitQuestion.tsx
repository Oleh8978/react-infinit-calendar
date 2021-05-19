import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

// components
import SelectBox from 'Component/Dropdown/Dropdown';

interface IItem {
  value: string;
  id: number,
}

interface IProps {}

const items = [
  {
    value: 'Journeys',
    id: 1,
  },
  {
    value: 'Mindfulness',
    id: 2,
  },
  {
    value: 'Podcasts',
    id: 3,
  },
  {
    value: 'Community',
    id: 3,
  },
];

const BodySubmitQuestion: React.FC<IProps> = () => {
  const [text, setText] = useState<string>('');
  const [defVal, setDefValue] = useState<IItem>({ value: 'Category', id: 24});
  return (
    <div className="ask-question-body">
      <SelectBox items={items} defVal={defVal}/>
      <TextareaAutosize
        cacheMeasurements
        value={text}
        onChange={(ev) => setText(ev.target.value)}
      />
    </div>
  );
};

export default BodySubmitQuestion;
