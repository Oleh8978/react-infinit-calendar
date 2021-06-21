import React, { useState } from 'react';

interface IProps {}

const Toogle: React.FC<IProps> = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  return (
    <div className={'block-btn-toogle'}>
      <label className="block-btn-toogle-switch">
        <input
          type="checkbox"
          checked={isClicked}
          onClick={() => setIsClicked(!isClicked)}
        />
        <span className="block-btn-toogle-slider round"></span>
      </label>
    </div>
  );
};

export default Toogle;
