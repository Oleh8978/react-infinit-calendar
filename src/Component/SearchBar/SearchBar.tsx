import React, { useState } from 'react';

import searchIcon from '../../Asset/images/searchIcon.png';
interface IProps {}

const SearchBar: React.FC<IProps> = () => {
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('');
  
  return (
    <div className={'searchbar__top'}>
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
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div
            className="searchbar-clear"
            onClick={() => {
              setIsOpened(false);
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
          onClick={() => setIsOpened(true)}
        />
      )}
    </div>
  );
};

export default SearchBar;
