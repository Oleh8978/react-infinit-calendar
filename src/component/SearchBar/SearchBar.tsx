import React, { useState } from 'react';

import Link from '@app/routing/Link';

import searchIcon from '@app/asset/images/searchIcon.svg';
interface IProps {
  smallMenu?: boolean;
  textHead?: string;
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
      {props.textHead && !isOpened ? (
        <>
          <Link to="account" className="module-menu-back">
            <div className="module-menu-back__top" />
            <div className="module-menu-back__bottom" />
          </Link>
        </>
      ) : (
        <></>
      )}
      {isOpened ? (
        ''
      ) : (
        <span className="searchbar__top-text">
          {props.textHead ? props.textHead : 'Discovery'}
        </span>
      )}
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
            id="input"
            type="text"
            className="searchbar-input"
            autoFocus
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
          style={{ animation: 'unset' }}
        />
      )}
    </div>
  );
};

export default SearchBar;
