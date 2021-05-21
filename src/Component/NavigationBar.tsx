import React, { useState } from 'react';

import { RouteComponentProps } from 'react-router-dom';

// components
import Link from 'Routing/Link';
import Pen from './CustomButtons/Pen';

// types
import { Pages } from 'Routing/schema';

import history from 'historyApi';

interface IProps {
  rout?: string;
  name: string;
  hasSaveButton?: boolean;
  isSaveBTNActive?: boolean;
  moveBack?: () => void;
  setModalWidowIsOpened?: () => void;
  isNotes?: boolean;
  page?: Pages;
  setIsEditable?: () => void;
  isSaveActive?: boolean;
  isBtnSaveActive?: boolean;
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
        {props.isNotes ? (
          <Link to={props.page} className="module-menu-back">
            <div className="module-menu-back__top" />
            <div className="module-menu-back__bottom" />
          </Link>
        ) : (
          <div
            className="module-menu-back"
            onClick={
              () => history.push(props.rout)
              // props.hasSaveButton
              //   ? () => {
              //       checker();
              //     }
              //   : () => {
              //       history.push(props.rout);
              //     }
            }>
            <div className="module-menu-back__top" />
            <div className="module-menu-back__bottom" />
          </div>
        )}
      </div>
      <div className="module-menu-col2">{props.name}</div>

      {props.isNotes ? (
        <div className="module-menu-col3">
          {props.isSaveActive ? (
            <>
              {' '}
              <span
                className={
                  props.isBtnSaveActive ? 'btn-save' : 'btn-save__inactive'
                }
                onClick={() => console.log('saved')}>
                Save
              </span>
            </>
          ) : (
            <Pen onClick={props.setIsEditable} />
          )}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default NavigationBar;
