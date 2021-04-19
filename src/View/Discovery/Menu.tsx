import React, { useState, useEffect, useRef } from 'react';

import { topics } from './FakeData/hardcodedData';

import { Topic } from './Models/DiscoveryModels';

interface IProps {}

const Menu: React.FC<IProps> = () => {
  const ItemsRender = (arr: Topic[]) => {
    const arrSorted = [];
    for (let i = 0; i < arr.length; i += 2) {
      if (arr[i] && arr[i + 1]) {
        arrSorted.push(
          <div
            className={'topic-items-container'}
            onClick={() => console.log('window.scrollY ', window.scrollY)}>
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

  return (
    <div className={'discovery-menu'}>
      <span className={'discovery-select'}>Select your topic interest</span>
      <div className={'discovery-menu-wrapper'}>{ItemsRender(topics)}</div>
    </div>
  );
};

export default Menu;
