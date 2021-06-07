import React, { useState } from 'react';

// types
import { Pages } from 'Routing/schema';

// interfaces
import { IItem, IZones } from '../Models';

interface IProps {
  data: IItem;
  timeZones?: IZones[];
}

const EdditBodyElementItem: React.FC<IProps> = ({ ...props }) => {
  const [value, setValue] = useState<string>(null);
  const [error, setError] = useState<boolean>(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const validate = () => {
    value ? setError(false) : setError(true);
  };

  return (
    <div className={'edditprofile-body-itemWrapper-element'}>
      <div className="edditprofile-body-itemWrapper-element-container">
        <span className={`edditprofile-body-itemWrapper-element-container-name ${error ? 'error' : ''}`}>
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
        {props.data.isSelect ? (
          <select
            className="edditprofile-body-itemWrapper-element-container-select
          edditprofile-body-itemWrapper-element-container-input">
            {props.timeZones.map((item) => {
              return (
                <option>
                  ({item.offset}) {item.name}
                </option>
              );
            })}
          </select>
        ) : (
          <input
            onBlur={props.data.isRequired ? validate : null}
            onChange={handleChange}
            type={props.data.isEmail ? 'email' : 'text'}
            className="edditprofile-body-itemWrapper-element-container-input"
            placeholder={props.data.name}
            value={value || props.data.default || ''}
          />
        )}
      </div>
    </div>
  );
};

export default EdditBodyElementItem;
