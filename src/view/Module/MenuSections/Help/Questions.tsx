import React from 'react';
import { dataList } from '../staticHardcoded/data';
import history from '../../../../historyApi';

interface IProps {
  text: string;
}

const Questions: React.FC<IProps> = ({ ...props }) => {
  const jorneyInfo = () => {
    history.push('/journey');
  };

  return (
    <>
      <h2 className={'questions-title'}>{props.text}</h2>
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
                <div
                  className="card-text-start-btn"
                  onClick={() => {
                    jorneyInfo();
                  }}>
                  {item.link}
                </div>
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
    </>
  );
};

export default Questions;
