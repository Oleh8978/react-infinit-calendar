import React, { useState, useEffect } from 'react';
interface IProps {}

const ModalWindowThanks: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'welldone thanks'}>
      <div className={'welldone-wrapper'}>
        <div className={'welldone-main'}>
          <h1 className={'welldone-header'}>Thank you</h1>
          <span className={'welldone-text'}>For getting in touch with us</span>
          <span className={'welldone-smiles'}>💙 💜 💙</span>
        </div>
      </div>
    </div>
  );
};

export default ModalWindowThanks;
