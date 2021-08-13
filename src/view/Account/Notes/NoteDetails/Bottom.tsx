import React, { useEffect, useState } from 'react';

// components
import LInk from '@app/routing/Link';

// history 
import history from '@app/historyApi';

interface IProps {
  title: string;
  subtitle: string;
  moduleId: number;
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
      <div className="notes-details-wrapper-bottom-item-link" onClick={() => {history.push(`/module/${props.moduleId}/task`)}}>
        Open module
      </div>
    </div>
  );
};

export default BottomComponent;
