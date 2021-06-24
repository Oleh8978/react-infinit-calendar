import React from 'react';

export interface IProps {
  isSmall?: boolean;
  isAbsolute?: boolean;
}

export const Loader: React.FC<IProps> = ({ ...props }) => {
  return (
    <>
      {props.isSmall ? (
        <div className={props.isAbsolute ? 'smallWrapper absoluteLoader' : 'smallWrapper'}>
          <div className={'loader'}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <div className={'loader'}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </>
  );
};

export default Loader;
