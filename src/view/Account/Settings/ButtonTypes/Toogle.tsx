import React, { useState } from 'react';

interface IProps {
  subname: string;
  functionality: (name: string) => void;
  isWorking: boolean;
}

const Toogle: React.FC<IProps> = ({ ...props }) => {
  const [isClicked, setIsClicked] = useState<boolean>(props.isWorking);
  return (
    <div className={'block-btn-toogle'}>
      <label className="block-btn-toogle-switch">
        <input
          type="checkbox"
          checked={isClicked}
          onClick={() => {
            setIsClicked(!isClicked);
            props.functionality(props.subname);
          }}
        />
        <span className="block-btn-toogle-slider round"></span>
      </label>
    </div>
  );
};

export default Toogle;
