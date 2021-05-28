import React from 'react';

// types
import { Pages } from 'Routing/schema';

// interfaces
import { IItem } from '../Models';

interface IProps {
  data: IItem;
}

const EdditBodyElementItem: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'edditprofile-body-itemWrapper-element'}>
      <div className="edditprofile-body-itemWrapper-element-container">
        <span className="edditprofile-body-itemWrapper-element-container-name">
          {props.data.name}
          <>
            {props.data.isRequired ? (
              <span className="edditprofile-body-itemWrapper-element-container-name-required">
                *
              </span>
            ) : (
              <> </>
            )}
          </>
        </span>
        <input
          className="edditprofile-body-itemWrapper-element-container-input"
          placeholder={props.data.name}></input>
      </div>
    </div>
  );
};

export default EdditBodyElementItem;
