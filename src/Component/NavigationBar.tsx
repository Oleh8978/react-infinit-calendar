import React, { useState } from 'react';

import { RouteComponentProps } from 'react-router-dom';

import history from 'historyApi';

interface IProps {
  rout: string;
  name: string;
  hasSaveButton?: boolean;
  isSaveBTNActive?: boolean;
  moveBack?: () => void;
  setModalWidowIsOpened?: () => void;
}

const NavigationBar: React.FC<IProps> = ({ ...props }) => {
  const checker = () => {
    if (props.isSaveBTNActive) {
      return props.setModalWidowIsOpened();
    } else {
      return (
        history.push(props.rout),
        props.moveBack(),
        props.setModalWidowIsOpened()
      );
    }
  };

  return (
    <div className={'module-menu'}>
      <div className="module-menu-col1">
        <div
          className="module-menu-back"
          onClick={
            props.hasSaveButton
              ? () => {
                  checker();
                }
              : () => {
                  history.push(props.rout);
                }
          }>
          <div className="module-menu-back__top" />
          <div className="module-menu-back__bottom" />
        </div>
      </div>
      <div className="module-menu-col2">{props.name}</div>
      <div className="module-menu-col3">
        {props.hasSaveButton ? (
          <>
            {props.isSaveBTNActive ? (
              <button onClick={() => props.setModalWidowIsOpened()}>
                Save
              </button>
            ) : (
              <span>Save not active</span>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
