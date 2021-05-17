import React, { useState, useEffect } from 'react';

interface IItem {
  value: string;
  id: number,
}

interface IProps {
    //need to changehte model 
  items: IItem[];
  defVal: IItem;
}

const SelectBox: React.FC<IProps> = ({ ...props }) => {
  const [items, setItems] = useState<IItem[]>(props.items);
  const [showItems, setShowItems] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IItem>(props.defVal);
  console.log('sected ', props.defVal)

  useEffect(() => {
    if (!selectedItem) {
      setSelectedItem(props.defVal)
    }
  }, [selectedItem])

  const dropDown = () => {
    setShowItems(!showItems);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setShowItems(false);
  };
  return (
    <div className="select-box-wrapper">
      <div className="select-box--box">
        <div className="select-box--container">
          <div className="select-box--selected-item">{selectedItem.value}</div>
          <div className="select-box--arrow" onClick={() => dropDown()}>
            <span
              className={`${
                showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'
              }`}
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
