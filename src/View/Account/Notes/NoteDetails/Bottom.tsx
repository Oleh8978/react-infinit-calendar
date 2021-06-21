import React, { useEffect, useState } from 'react';

// components
import LInk from 'routing/Link';

interface IProps {
  title: string;
  subtitle: string;
}

const BottomComponent: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'notes-details-wrapper-bottom-item'}>
      <div className={'notes-details-wrapper-bottom-item__header'}>
        <span className={'notes-details-wrapper-bottom-item__header__top'}>
          {props.title}
        </span>
        <span className={'notes-details-wrapper-bottom-item__header__bottom'}>
          {props.subtitle}
        </span>
      </div>
      <LInk className="notes-details-wrapper-bottom-item-link" to={'module'}>
        Open module
      </LInk>
    </div>
  );
};

export default BottomComponent;
