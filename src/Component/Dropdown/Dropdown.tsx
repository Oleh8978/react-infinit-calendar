import React, { useState, useEffect } from 'react';

interface IItem {
  id: number;
  value: string;
}

interface IProps {
  //need to changehte model
  items: any;
  value: string;
  setTextFromDropdown: (text: any) => void;
  isDropdownError: boolean;
}

const SelectBox: React.FC<IProps> = ({ ...props }) => {
  const [items, setItems] = useState<any>(props.items);
  const [showItems, setShowItems] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>('');

  const dropDown = () => {
    setShowItems(!showItems);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setShowItems(false);
  };

  useEffect(() => {
    props.setTextFromDropdown(selectedItem.value);
  }, [showItems]);

  return (
    <div className={`select-box-wrapper ${props.isDropdownError ? 'error' : ''}`}>
      <div className='select-box--box'>
        <div className='select-box--container' onClick={() => dropDown()}>
          <div className='select-box--selected-item'>{selectedItem.value || 'Category'}</div>
          <div className={`select-box--arrow ${showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'}`}>
            <span
              className={'arrow-icon'}
            />
          </div>

          <div
            style={{ display: showItems ? 'block' : 'none' }}
            className={'select-box--items'}>
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => selectItem(item)}
                className={selectedItem === item ? 'selected' : 'select-box--items-item'}>
                {item.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
