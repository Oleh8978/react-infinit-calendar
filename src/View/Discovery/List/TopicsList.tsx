import React, { useState, useEffect } from 'react';

import { dataList } from '../FakeData/list/List';

interface IProps {
  margin: number;
}

const DiscoveryTopicList: React.FC<IProps> = ({ margin }) => {
  return (
    <div className={'discovery-list'} style={{ marginTop: `${margin}` + 'px' }}>
      <span className="discovery-list-title">Full list</span>
      <div className="discovery-list-holder">
        {dataList.map((item) => {
          if (item.display === 'full') {
            return (
              <div className="discovery-list-item-holder">
                <img
                  className="discovery-list-item-img"
                  src={item.img}
                  alt="image"
                />
                <div
                  className="discovery-list-item-description"
                  style={{
                    color: item.color,
                    backgroundColor: item.backgroundColor,
                  }}>
                  <span className="card-text-wrapper">
                    <h1 className="card-text-header">{item.title}</h1>
                    {item.description}
                  </span>
                </div>
              </div>
            );
          } else if (item.display === 'half') {
            return (
              <div
                className="discovery-list-item-holder__half"
                style={{ display: 'flex', flexFlow: 'row' }}>
                <img
                  className="discovery-list-item-img"
                  src={item.img}
                  alt="image"
                />
                <span
                  className="card-text-wrapper-link"
                  style={{ color: item.color }}>
                  <h1 className="card-text-link">{item.link}</h1>
                  <h1 className="card-text-header">{item.title}</h1>
                  {item.description}
                </span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default DiscoveryTopicList;
