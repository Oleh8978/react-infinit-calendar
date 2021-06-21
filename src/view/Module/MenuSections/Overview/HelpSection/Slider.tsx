import React, { useState, useEffect } from 'react';

// components
import Link from '@app/routing/Link';

// interfaces
import { IExperts } from '@app/view/Module/MenuSections/Overview/Models';

interface IProps {
  people: IExperts[];
  isMain: boolean;
  marginBottom?: boolean;
}

const Slider: React.FC<IProps> = ({ ...props }) => {
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
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      ele.scrollTop = pos.top - dy;
      ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    if (ele !== null) ele.addEventListener('mousedown', mouseDownHandler);
  };

  useEffect(() => {
    const elementGenral = document.querySelector('.overview-help-slider ');
    moseMover(elementGenral);
  }, []);

  return (
    <>
      <div
        className={
          props.marginBottom
            ? 'overview-help-slider__marginnull scrollbar__hidden'
            : 'overview-help-slider scrollbar__hidden'
        }>
        {props.people.map((persone) => {
          return (
            <>
              {props.isMain ? (
                // <Link className="overview-help-slider-item" to={'expert-help'}>
                //   <img
                //     src={persone.img}
                //     className="overview-help-slider-item-img"
                //   />
                //   <span className="overview-help-slider-item-name">
                //     {persone.name}
                //   </span>
                //   <div className="overview-help-slider-item__bottom-line"></div>
                // </Link>
                <div className="overview-help-slider-item">
                  <img
                    src={persone.img}
                    className="overview-help-slider-item-img"
                  />
                  <span className="overview-help-slider-item-name">
                    {persone.name}
                  </span>
                  <div className="overview-help-slider-item__bottom-line"></div>
                </div>
              ) : (
                <div className="overview-help-slider-item">
                  <img
                    src={persone.img}
                    className="overview-help-slider-item-img"
                  />
                  <span className="overview-help-slider-item-name">
                    {persone.name}
                  </span>
                  <div className="overview-help-slider-item__bottom-line"></div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </>
  );
};

export default Slider;
