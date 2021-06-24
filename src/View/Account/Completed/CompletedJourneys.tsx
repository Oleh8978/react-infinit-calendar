import React, { useState, useEffect } from 'react';

// components
import JourneyCompletedItem from './CompletedItemList';

// interfaces
import { IJourney } from 'Controller/statisticList/models';

interface IProps {
  listData: IJourney[];
}

const CompletedJourneys: React.FC<IProps> = ({ ...props }) => {

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
    const elementGenral = document.querySelector(
      '.profile-myjourneys-completed-wrapper',
    );
    moseMover(elementGenral);
  }, []);

  return (
    <div className={'profile-myjourneys-completed'}>
      <span className={'profile-myjourneys-header'}>Completed journeys </span>
      {/* <div className={'profile-myjourneys-completed-container'}> */}
      <div className={'profile-myjourneys-completed-wrapper'}>
        {props.listData &&
          props.listData.map((item) => {
            return <JourneyCompletedItem data={item} />;
          })}
      </div>
      {/* </div> */}
    </div>
  );
};

export default CompletedJourneys;
