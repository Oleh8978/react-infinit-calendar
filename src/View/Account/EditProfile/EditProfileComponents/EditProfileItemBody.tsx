import React from 'react';

// types
import { Pages } from 'Routing/schema';

// components
import EdditBodyElementItem from './EditProfileItem';

// interfaces
import { IData } from '../Models';

interface IProps {
  data: IData;
}

const EdditProfileBodyComponent: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'edditprofile-body-itemWrapper'}>
      <div className="edditprofile-body-itemWrapper-item">
        <span className="edditprofile-body-itemWrapper-item-header">
          {props.data.name}
        </span>
        <div className="edditprofile-body-itemWrapper-item-body">
          {props.data.details.map((item) => {
            return <EdditBodyElementItem data={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default EdditProfileBodyComponent;
