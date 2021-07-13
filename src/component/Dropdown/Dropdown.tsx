import React, { useState, useEffect } from 'react';

// components
import Loader from '@app/component/Loader';

// interfaces
import { ArticleDTO } from '@ternala/frasier-types';
// interface IItem {
//   id: number;
//   value: string;
// }

interface IProps {
  //need to changehte model
  items: ArticleDTO[];
  value: string;
  setTextFromDropdown: (text: any) => void;
  isDropdownError: boolean;
  topicListLoader: boolean;
}

const SelectBox: React.FC<IProps> = ({ items, ...props }) => {
  // const [items, setItems] = useState<any>(props.items);
  const [showItems, setShowItems] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>('');

  const dropDown = () => {
    setShowItems(!showItems);
  };

  const selectItem = (item) => {
    props.setTextFromDropdown(item.id);
    setSelectedItem(item.title);
    setShowItems(false);
  };

  return (
    <div
      className={`select-box-wrapper ${props.isDropdownError ? 'error' : ''}`}>
      <div className="select-box--box">
        <div className="select-box--container" onClick={() => dropDown()}>
          <div className="select-box--selected-item">
            {selectedItem || 'Category'}
          </div>
          <div
            className={`select-box--arrow ${
              showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'
            }`}>
            <span className={'arrow-icon'} />
          </div>

          <div
            style={{ display: showItems ? 'block' : 'none' }}
            className={'select-box--items'}>
            {props.topicListLoader === false ? (
              <>
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => selectItem(item)}
                    className={
                      selectedItem === item.title
                        ? 'selected'
                        : 'select-box--items-item'
                    }>
                    {item.title}
                  </div>
                ))}
              </>
            ) : (
              <Loader isSmall={true} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
