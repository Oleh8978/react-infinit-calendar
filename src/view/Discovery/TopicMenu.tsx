import React, { useState, useEffect } from 'react';

import { topics } from './FakeData/hardcodedData';

import { ITopic } from './Models/DiscoveryModels';

// components
import Loader from '@app/component/Loader';

//interface
import { ArticleDTO } from '@ternala/frasier-types';

interface IProps {
  marginAdder: (isSmall: boolean) => void;
  articleCategories: ArticleDTO[] | undefined;
  loadDiscovloadArticleCategoeries: (point: string) => void;
  arraySetter?: (id: number) => void;
}

const TopicMenu: React.FC<IProps> = ({ marginAdder, ...props }) => {
  const [smallMenu, setSmallMenu] = useState<boolean>(false);
  const [articleCategories, setrticleCategories] = useState<any>([]);

  const scrollTracker = () => {
    if (document.querySelector('.main-wrapper-discovery').scrollTop > 400) {
      setSmallMenu(true);
      marginAdder(true);
    } else {
      setSmallMenu(false);
      marginAdder(false);
    }
  };

  const scrollToTop = () => {
    document.querySelector('.main-wrapper-discovery').scrollTo(0, 0);
  };

  const LoadMoreTracker = () => {
    const element = document.querySelector(
      '.discovery-menu-wrapper',
    ) as HTMLElement;
    console.log('element.offsetLeft ', element.offsetLeft);
  };
  const moseMover = (ele) => {
    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = (e) => {
      pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
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
    // functionlity to track sroll offfset
    LoadMoreTracker();
  };

  useEffect(() => {
    const elementGenral = document.querySelector('.discovery-menu-wrapper');
    const elementSmall = document.querySelector(
      '.discovery-menu-wrapper__small',
    );

    moseMover(elementGenral);
    moseMover(elementSmall);

    document
      .querySelector('.main-wrapper-discovery')
      .addEventListener('scroll', () => {
        scrollTracker();
      });

    if (props.articleCategories !== undefined) {
      setrticleCategories(props.articleCategories);
    }

    return () => {
      const main = document.querySelector('.main-wrapper-discovery');

      if (main !== null)
        main.removeEventListener('scroll', () => scrollTracker());
    };
  }, [props.articleCategories]);

  const bigMenuRender = (arr: ITopic[]) => {
    const arrSorted = [];
    for (let i = 0; i < arr.length; i += 2) {
      if (arr[i] && arr[i + 1]) {
        arrSorted.push(
          <div className={'topic-items-container'}>
            <div
              className={'topic-item__top'}
              style={{ backgroundColor: arr[i].color }}
              onClick={() => props.arraySetter(arr[i].id)}>
              <div className="topic-item-img">
                <div className="topic-item-img-wrapper">
                  <img src={arr[i].icon} alt="img" />
                </div>
              </div>
              <span className="topic-item-text">{arr[i].title}</span>
            </div>
            <div
              className={'topic-item__bottom'}
              style={{ backgroundColor: arr[i + 1].color }}
              onClick={() => props.arraySetter(arr[i + 1].id)}>
              <div className="topic-item-img">
                <div className="topic-item-img-wrapper">
                  <img src={arr[i + 1].icon} alt="img" />
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
            style={{ backgroundColor: arr[arr.length - 1].color }}
            onClick={() => props.arraySetter(arr[arr.length - 1].id)}>
            <div className="topic-item-img">
              <div className="topic-item-img-wrapper">
                <img src={arr[arr.length - 1].icon} alt="img" />
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
          <span className="discovery-menu-small-btn-txt">All</span>
        </div>
        <>
          {items.map((element) => {
            return (
              <div
                className="discovery-menu-small-item"
                onClick={() => props.arraySetter(element.id)}>
                <span className="discovery-menu-small-item-txt">
                  {element.title}
                </span>
              </div>
            );
          })}
        </>
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
        <>
          {articleCategories !== undefined && (
            <div
              className={
                'discovery-menu-wrapper__small menu-animated scrollbar__hidden'
              }>
              {smallMenuRender(articleCategories)}
            </div>
          )}
        </>
      </div>

      <div className={'discovery-menu'}>
        <span className={'discovery-select'}>Select your topic interest</span>
        <>
          {articleCategories !== undefined && (
            <div className={'discovery-menu-wrapper scrollbar__hidden'}>
              {bigMenuRender(articleCategories)}
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default TopicMenu;
