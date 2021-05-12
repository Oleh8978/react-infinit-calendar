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
    console.log('inn', document.querySelector('.main-wrapper').scrollTop);
    if (document.querySelector('.main-wrapper').scrollTop > 400) {
      setSmallMenu(true);
      marginAdder(true);
    } else {
      setSmallMenu(false);
      marginAdder(false);
    }
  };

  const scrollToTop = () => {
    document.querySelector('.main-wrapper').scrollTo(0, 0);
  };

  const moseMover = (ele) => {
    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = (e) => {
      pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = (e) => {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      ele.scrollTop = pos.top - dy;
      ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Attach the handler
    if (ele !== null) ele.addEventListener('mousedown', mouseDownHandler);
  };

  useEffect(() => {
    const elementGenral = document.querySelector('.discovery-menu-wrapper');
    const elementSmall = document.querySelector(
      '.discovery-menu-wrapper__small',
    );

    moseMover(elementGenral);
    moseMover(elementSmall);

    document.querySelector('.main-wrapper').addEventListener('scroll', () => {
      scrollTracker(), console.log('innn');
    });

    return () => {
      const main = document.querySelector('.main-wrapper');

      if (main !== null)
        main.removeEventListener('scroll', () => scrollTracker());
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
                className="topic-item-img">
                <div className="topic-item-img-wrapper">
                  <img src={arr[i].image} alt="img" />
                </div>
              </div>
              <span className="topic-item-text">{arr[i].title}</span>
            </div>
            <div
              className={'topic-item__bottom'}
              style={{ backgroundColor: arr[i + 1].color }}>
              <div
                className="topic-item-img">
                <div className="topic-item-img-wrapper">
                  <img src={arr[i + 1].image} alt="img" />
                </div>
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
              className="topic-item-img">
              <div className="topic-item-img-wrapper">
                <img src={arr[arr.length - 1].image} alt="img" />
              </div>
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
    <>
      <div
        className={'discovery-menu '}
        style={{
          position: 'fixed',
          top: '50px',
          display: smallMenu ? 'flex' : 'none',
        }}>
        <SearchBar smallMenu={smallMenu} />
        <div
          className={
            'discovery-menu-wrapper__small menu-animated scrollbar__hidden'
          }>
          {smallMenuRender(topics)}
        </div>
      </div>

      <div className={'discovery-menu'}>
        <SearchBar smallMenu={smallMenu}/>
        <span className={'discovery-select'}>Select your topic interest</span>
        <div className={'discovery-menu-wrapper scrollbar__hidden'}>
          {bigMenuRender(topics)}
        </div>
      </div>
    </>
  );
};

export default TopicMenu;
