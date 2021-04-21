import React, { useState, useEffect } from 'react';

import { topics } from './FakeData/hardcodedData';

import { ITopic } from './Models/DiscoveryModels';

// searchbar component
import SearchBar from '../../Component/SearchBar/SearchBar';

interface IProps {
  marginAdder: (isSmall: boolean) => void;
}

const TopicMenu: React.FC<IProps> = ({ marginAdder }) => {
  const [smallMenu, setSmallMenu] = useState<boolean>(false);

  const scrollTracker = () => {
    if (document.getElementById('main').scrollTop > 400) {
      setSmallMenu(true);
      marginAdder(true);
    } else {
      setSmallMenu(false);
      marginAdder(false);
    }
  };

  const scrollToTop = () => {
    document.getElementById('main').scrollTo(0, 0);
  };
  useEffect(() => {
    document
      .getElementById('main')
      .addEventListener('scroll', () => scrollTracker());
    return () => {
      document
        .getElementById('main')
        .removeEventListener('scroll', () => scrollTracker());
    };
  }, []);
  const bigMenuRender = (arr: ITopic[]) => {
    const arrSorted = [];
    for (let i = 0; i < arr.length; i += 2) {
      if (arr[i] && arr[i + 1]) {
        arrSorted.push(
          <div className={'topic-items-container'}>
            <div
              className={'topic-item__top'}
              style={{ backgroundColor: arr[i].color }}>
              <div
                className="topic-item-img"
                style={{ backgroundColor: arr[i].secondarycolor }}>
                <img src={arr[i].image} alt="img" />
              </div>
              <span className="topic-item-text">{arr[i].title}</span>
            </div>
            <div
              className={'topic-item__bottom'}
              style={{ backgroundColor: arr[i + 1].color }}>
              <div
                className="topic-item-img"
                style={{ backgroundColor: arr[i + 1].secondarycolor }}>
                <img src={arr[i + 1].image} alt="img" />
              </div>
              <span className="topic-item-text">{arr[i + 1].title}</span>
            </div>
          </div>,
        );
      }
    }

    if (arr[arr.length - 1] && arrSorted.length * 2 !== arr.length) {
      arrSorted.push(
        <div className={'topic-items-container'}>
          <div
            className={'topic-item__top'}
            style={{ backgroundColor: arr[arr.length - 1].color }}>
            <div
              className="topic-item-img"
              style={{ backgroundColor: arr[arr.length - 1].secondarycolor }}>
              <img src={arr[arr.length - 1].image} alt="img" />
            </div>
            <span className="topic-item-text">{arr[arr.length - 1].title}</span>
          </div>
        </div>,
      );
    }
    return arrSorted;
  };

  const smallMenuRender = (items: ITopic[]) => {
    return (
      <div className="discovery-menu-small">
        <div className="discovery-menu-small-btn" onClick={() => scrollToTop()}>
          All
        </div>
        {items.map((element) => {
          return (
            <div className="discovery-menu-small-item">{element.title}</div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={'discovery-menu'}
      style={{ position: smallMenu ? 'fixed' : 'unset' }}>
      <SearchBar />
      <span className={'discovery-select'}>Select your topic interest</span>
      <div className={'discovery-menu-wrapper'}>
        {smallMenu ? smallMenuRender(topics) : bigMenuRender(topics)}
      </div>
    </div>
  );
};

export default TopicMenu;
