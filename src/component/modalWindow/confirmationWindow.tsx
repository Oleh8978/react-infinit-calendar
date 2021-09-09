import React, { useState, useEffect } from 'react';

interface IProps {
  firstAction?: () => void;
  secondAction?: () => void;
  text?: string;
  title?: string | Date;
  firstButton: string;
  secondButton: string;
}

const ConfirmationWindow: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className="modalwindow-container" id="modal">
      <div className="modalwindow-wrapper">
        <div className="modalwindow">
          <span className="modalwindow-question">{props.text}</span>
          <span className="modalwindow-notification">{props.title}</span>
          <div className="modalwindow-btns-wrapper">
            <button
              className="modalwindow-discard"
              onClick={() => {
                props.firstAction();
              }}>
              <span className="modalwindow-btns-text">{props.firstButton}</span>
            </button>
            <button
              className="modalwindow-save"
              onClick={() => {
                props.secondAction();
              }}>
              <span className="modalwindow-btns-text">
                {props.secondButton}
              </span>
            </button>
          </div>
        </div>{' '}
      </div>
    </div>
  );
};

export default ConfirmationWindow;
