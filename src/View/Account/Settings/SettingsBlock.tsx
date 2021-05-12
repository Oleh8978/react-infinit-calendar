import React from 'react';

// components
import Arrow from './ButtonTypes/Arrow';
import Toogle from './ButtonTypes/Toogle';

// interfaces
import { ISetting } from './Models';

interface IProps {
  data: ISetting;
}

const SettingsBlock: React.FC<IProps> = ({ ...props }) => {
  const typeOfButton = (item: string) => {
    let elem = <> </>;
    if (item === 'toogle') {
      elem = <Toogle />;
    } else if (item === 'next') {
      elem = <Arrow />;
    } else {
      elem = <> </>;
    }
    return elem;
  };
  return (
    <div className={'block'}>
      <div className={'block-header'}>
        <img src={props.data.icon} className={'block-header-img'} alt="img" />
        <span className={'block-header-text'}>{props.data.name}</span>
      </div>
      <div className={'block-body'}>
        {props.data.items.map((item) => {
          return (
            <div className={'block-body-item-wrapper'}>
              <span
                className={'block-body-item-wrapper-text'}
                style={{ color: item.button ? '#373737' : '#8179DC' }}>
                {item.name}
              </span>
              {typeOfButton(item.button)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsBlock;
