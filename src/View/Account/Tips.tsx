import React, { useState, useEffect } from 'react';

// static
import imgW from './static/messageW.png';
import imgM from './static/messageM.png';
import oldTip from './static/oldtips.png';

interface IProps {}

const Tips: React.FC<IProps> = () => {
  const [number, setNumber] = useState<number>(45);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [img, setImg] = useState<string>(imgW);
  const images = [imgW, imgM];

  return (
    <div className={'tips'}>
      <span className={'tips-header'}>Tips from fraiser</span>
      <div className={'tips-wrapper'}>
        <span className={'tips-number'}>{number}</span>
        {isNew ? <span className={'tips-new'}>new</span> : <> </>}
        <span className={'tips-tip'}>tips</span>
        <img
          src={images[Math.floor(Math.random() * 2)]}
          className={'tips-persone'}
          alt="img"
        />
      </div>
    </div>
  );
};

export default Tips;
