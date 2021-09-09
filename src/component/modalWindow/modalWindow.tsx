import React, { useState, useEffect } from 'react';

interface IProps {
  discard: () => void;
  save: () => void;
}

const ModalWindow: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className="modalwindow-container" id={'modal'}>
      <div className="modalwindow-wrapper">
        <div className="modalwindow">
          <span className="modalwindow-question">
            Would you like to save your note?
          </span>
          <span className="modalwindow-notification">unsaved changes</span>
          <div className="modalwindow-btns-wrapper">
            <button
              className="modalwindow-discard"
              onClick={() => {
                props.discard();
              }}>
              <span className="modalwindow-btns-text">Discard</span>
            </button>
            <button
              className="modalwindow-save"
              onClick={() => {
                props.save();
              }}>
              <span className="modalwindow-btns-text">Save</span>
            </button>
          </div>
        </div>{' '}
      </div>
    </div>
  );
};

export default ModalWindow;
