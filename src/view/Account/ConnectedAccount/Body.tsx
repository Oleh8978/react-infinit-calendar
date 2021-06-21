import React, { useState, useEffect } from 'react';

// static
import * as staticConfig from '../EditProfile/static';

// components
import ItemBody from './ItemBody';

// models
import { IListSocial, IListSocialState } from '../EditProfile/Models';

interface IProps {}

const ConnectedAccountBody: React.FC<IProps> = ({ ...props }) => {
  const [items, setItems] = useState<IListSocialState[] | undefined>();

  const setItemsToState = () => {
    const arr = [];
    staticConfig.socialMediInfo.map((item) => {
      arr.push({
        name: item.name,
        isLinked: false,
      });
    });
    setItems(arr);
  };

  useEffect(() => {
    if (items === undefined) {
      setItemsToState();
    }
  }, [items]);

  return (
    <div className={'edditprofile-links-body'}>
      {items &&
        items.map((item: IListSocialState) => {
          return <ItemBody data={item} />;
        })}
    </div>
  );
};

export default ConnectedAccountBody;
