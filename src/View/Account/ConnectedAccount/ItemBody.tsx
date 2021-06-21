import React from 'react';

// components
import HalfBTNPink from 'component/HalfBtn';

// models
import { IListSocialState } from '../EditProfile/Models';

interface IProps {
  data: IListSocialState;
}

const ItemBody: React.FC<IProps> = ({ ...props }) => {
  const functionality = () => {
    console.log('clikced');
  };
  return (
    <div className={'edditprofile-links-body-item'}>
      <div className="edditprofile-links-body-item-wrapper">
        <div className="edditprofile-links-body-item-wrapper__name">
          {props.data.name}
        </div>
        <div className="edditprofile-links-body-item-wrapper__btn">
          <HalfBTNPink
            functionality={functionality}
            isLinked={props.data.isLinked}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemBody;
