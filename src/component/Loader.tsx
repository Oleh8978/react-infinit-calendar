import React from 'react';

export interface IProps {
  isSmall?: boolean;
  styleComp?: number;
  isAbsolute?: boolean;
  className?: string;
  isShow?: boolean;
}

export const Loader: React.FC<IProps> = ({ className, isShow, ...props }) => {
  return (
    <>
      {props.isSmall ? (
        <div
          className={
            (className || '') +
            (isShow ? ' show' : '') +
            ' smallWrapper' +
            (props.isAbsolute ? ' absoluteLoader' : '')
          }>
          <div
            className={'loader'}
            style={{
              height: props.styleComp ? `${props.styleComp}px` : 'auto',
            }}>
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      ) : (
        <div className={'loader'}>
          <span />
          <span />
          <span />
          <span />
        </div>
      )}
    </>
  );
};

export default Loader;
