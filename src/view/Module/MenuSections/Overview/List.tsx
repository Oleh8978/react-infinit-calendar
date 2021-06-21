import React, { useState } from 'react';

// interfaces
import { IListLink } from './Models';

interface IProps {
  items?: string[];
  underlinedItems?: IListLink[];
  isUnderlined: boolean;
}

const List: React.FC<IProps> = ({ ...props }) => {
  return (
    <>
      {props.isUnderlined ? (
        <div className="overview-list__underlined">
          {props.underlinedItems.map((item) => {
            return (
              <div
                className="overview-list__underlined-item"
                onClick={() => {
                  console.log(item.link);
                }}>
                <span className="overview-list__underlined-item-head">
                  {item.title}
                </span>
                <span className="overview-list__underlined-item-text">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overview-list__regular">
          <ul className="overview-list__regular-wrapper">
            {props.items.map((item) => {
              return <li className="overview-list__regular-item">{item}</li>;
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default List;
