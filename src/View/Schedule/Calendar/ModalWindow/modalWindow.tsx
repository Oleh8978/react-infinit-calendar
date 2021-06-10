import React, { useState, useEffect } from 'react';

// static
import check from 'Asset/images/confirm.png';
import back from 'Asset/images/back.png';

interface IProps {
  setModalOpened: () => void
}

const ModalWindow: React.FC<IProps> = ({ setModalOpened }) => {
  return (
    <div className="modal">
      <div className="modal-btn-wrapper">
        <div className="modal-btn__close" onClick={()=> setModalOpened()}>
          <img className="modal-btn-img" src={check} alt="img" />{' '}
          <span className="modal-btn-text">Set as Day-Off</span>
        </div>
        <div className="modal-btn__dayoff" onClick={()=> setModalOpened()}>
          {' '}
          <img className="modal-btn-img" src={back} alt="img" />
          <span className="modal-btn-text">Close</span>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
