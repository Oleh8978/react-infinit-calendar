import React from 'react';

// components
import Arrow from './ButtonTypes/Arrow';
import Toogle from './ButtonTypes/Toogle';
import Link from '@app/routing/Link';

// interfaces
import { ISetting } from './Models';

interface IProps {
  data: ISetting;
  isAboutPage?: boolean;
  version?: string;
  name?: string;
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
      <>
        {props.isAboutPage ? (
          <> </>
        ) : (
          <div className={'block-header'}>
            <img
              src={props.data.icon}
              className={'block-header-img'}
              alt="img"
            />
            <span className={'block-header-text'}>{props.data.name}</span>
          </div>
        )}
      </>
      <div className={'block-body'}>
        <>
          {props.isAboutPage ? (
            <div className={'block-body-item-wrapper'}>
              <span className={'block-body-item-wrapper-text about-text'}>
                {props.name}
              </span>
              <span className={'block-body-item-wrapper-text rightaligner'}>
                {props.version}
              </span>
            </div>
          ) : (
            <> </>
          )}
        </>
        {props.data.items.map((item) => {
          return (
            <>
              {item.link ? (
                <Link className={'block-body-item-wrapper'} to={item.link}>
                  <span
                    className={'block-body-item-wrapper-text'}
                    style={{ color: item.button ? '#373737' : '#8179DC' }}>
                    {item.name}
                  </span>
                  {typeOfButton(item.button)}
                </Link>
              ) : (
                <div className={'block-body-item-wrapper'}>
                  <span
                    className={'block-body-item-wrapper-text'}
                    style={{ color: item.button ? '#373737' : '#8179DC' }}>
                    {item.name}
                  </span>
                  {typeOfButton(item.button)}
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsBlock;
