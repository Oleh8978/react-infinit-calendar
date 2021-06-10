import React, { useState, useEffect } from 'react';

import { dataList } from '../FakeData/list/List';

import AnswerNotFound from '../AnswerNotFound/AnswerNotFound';

// components
import Link from 'Routing/Link';

// history
import history from 'historyApi';

interface IProps {
  margin: number;
}

const DiscoveryTopicList: React.FC<IProps> = ({ margin }) => {
  const jorneyInfo = () => {
    history.push('/journey');
  };
  return (
    //style={{ marginTop: `${margin}` + 'px' }}
    <div className={'discovery-list'}>
      <span className="discovery-list-title">Full list</span>
      <div className="discovery-list-holder">
        {dataList.map((item) => {
          if (item.display === 'full') {
            return (
              <div className="discovery-list-item-holder">
                <div className="discovery-list-item-imgwrapper">
                  <img
                    className="discovery-list-item-img"
                    src={item.img}
                    alt="image"
                  />
                </div>
                {/* <div
                  className="discovery-list-item-img"
                  style={{
                    backgroundImage: `url(${item.img})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                /> */}
                <div
                  className="discovery-list-item-description"
                  style={{
                    color: item.color,
                    backgroundColor: item.backgroundColor,
                  }}>
                  <span className="card-text-wrapper">
                    {/* <div className="text-wrapper"> */}
                    <h1 className="card-text-header">{item.title}</h1>
                    {item.description}
                    {/* </div> */}
                  </span>
                  {item.link === 'Join Now' ? (
                    <div
                      className="card-text-start-btn btnStartExtended"
                      onClick={() => {
                        window.open('https://www.meetup.com/ru-RU/manage-your-small-biz/', '_blank')
                      }}>
                      {item.link}
                    </div>
                  ) : (
                    <Link to={'journey'} className="card-text-start-btn">
                      {/* <div
                      className="card-text-start-btn"
                      onClick={() => {
                        jorneyInfo();
                      }}> */}
                      {item.link}
                      {/* </div> */}
                    </Link>
                  )}
                </div>
              </div>
            );
          } else if (item.display === 'half') {
            return (
              <div
                className="discovery-list-item-holder__half"
                style={{ display: 'flex', flexFlow: 'row' }}>
                <img
                  className="discovery-list-item-img__half"
                  src={item.img}
                  alt="image"
                />
                {/* <div
                  className="discovery-list-item-img__half"
                  style={{
                    backgroundImage: `url(${item.img})`,
                    backgroundPosition: 'center',
                  }}
                /> */}
                <span
                  className="card-text-wrapper-link"
                  style={{ color: item.color }}>
                  <Link to={'article'}>
                    <h1 className="card-text-link">{item.link}</h1>
                  </Link>
                  <h1 className="card-text-header">{item.title}</h1>
                  {item.description}
                </span>
              </div>
            );
          }
        })}
        <AnswerNotFound />
      </div>
    </div>
  );
};

export default DiscoveryTopicList;
