import React, { useState } from 'react';

import searchIcon from '@app/asset/images/searchIcon.svg';
interface IProps {
  smallMenu?: boolean;
  inputValueFromSearch?: (text: string) => void;
  onCloseHandler?: () => void;
}

const SearchBar: React.FC<IProps> = ({ smallMenu, ...props }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // const onCloseHandler = () => {
  //   return props.onCloseHandler? props.onCloseHandler : console.log('close');
  // }

  return (
    <div
      className={'searchbar__top'}
      onClick={() => {
        if (!isOpened) setIsOpened(true);
      }}
      // style={{
      //   // marginTop: '50px',
      //   zIndex: 99,
      //   position: 'fixed',
      // }}
    >
      {isOpened ? (
        <>
          <img
            src={searchIcon}
            className="searchbar-btn__input"
            alt="img"
            onClick={() => {
              console.log('search');
            }}
          />
          <input
            type="text"
            className="searchbar-input"
            onChange={(e) => props.inputValueFromSearch(e.target.value)}
          />
          <div
            className="searchbar-clear"
            onClick={() => {
              setIsOpened(false);
              props.onCloseHandler();
            }}>
            <div className="searchbar-clear-left" />
            <div className="searchbar-clear-right" />
          </div>
        </>
      ) : (
        <img
          src={searchIcon}
          className="searchbar-btn"
          alt="img"
        />
      )}
    </div>
  );
};

export default SearchBar;
