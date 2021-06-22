import React from 'react';

// static
import img from '../static/go.png';

interface IProps {}

const Arrow: React.FC<IProps> = () => {
  return (
    <div className={'block-btn-arrow'}>
      <img src={img} className={'block-btn-arrow-img'} alt="img" />
    </div>
  );
};

export default Arrow;
