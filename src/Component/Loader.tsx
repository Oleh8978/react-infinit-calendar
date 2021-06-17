import React from 'react';

export interface IProps {
  isSmall?: boolean;
}

export const Loader: React.FC<IProps> = ({ ...props }) => {
  return (
    <>
      {props.isSmall ? (
        <div className="smallWrapper">
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
