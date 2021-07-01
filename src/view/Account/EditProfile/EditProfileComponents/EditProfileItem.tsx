import React, { useState, useEffect } from 'react';

// types
import { Pages } from '@app/routing/schema';

// interfaces
import { IItem, IZones } from '../Models';
import { IUser } from '@app/controller/auth/model';
import { IvalidatorState } from '../../../LoginPages/utils/models';

// utils 
import { entryValidator } from './utils/utils';

interface IProps {
  data: IItem;
  timeZones?: IZones[];
  isFirstpage?: boolean;
  user?: IUser;
  validatorFunctionality?: (key: string, value: string) => void;
  setObjectState?: (key: string, value: string) => void;
  observer?: () => void;
}

const EdditBodyElementItem: React.FC<IProps> = ({ ...props }) => {
  const [value, setValue] = useState<string>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (props.user) {
      itemIterator();
    }
  }, [props.user]);

  const validator = (key: string, value: string) => {
    if (
      key === 'email' ||
      key === 'phone' ||
      key === 'firstName' ||
      key === 'lastName'
    ) {
      if (value !== null && value !== undefined) {
        props.validatorFunctionality(key, value.trim());
      }
    }
  };

  const itemIterator = () => {
    if (props.user !== undefined && props.data.subname !== undefined) {
      for (const [key, value] of Object.entries(props.user.userData)) {
        if (
          props.data.subname.toLowerCase() === String(key.toLowerCase()) &&
          value !== null
        ) {
          validator(key, value);
          return setValue(String(value));
        }
      }
    }
  };

  const handleChange = (event) => {
    if (!props.isFirstpage) {
      props.setObjectState(props.data.subname, event.target.value);
    }
    setValue(entryValidator(props.data.subname, event.target.value));
    validator(props.data.subname, event.target.value);
  };

  const dropOnChangeValue = (event) => {
    props.observer();
    props.setObjectState(props.data.subname, event.target.value);
  };

  const validate = () => {
    value ? setError(false) : setError(true);
  };

  return (
    <div className={'edditprofile-body-itemWrapper-element'}>
      <div className="edditprofile-body-itemWrapper-element-container">
        <span
          className={`edditprofile-body-itemWrapper-element-container-name ${
            error ? 'error' : ''
          }`}>
          {props.data.name}
          <>
            {props.data.isRequired ? (
              <span className="edditprofile-body-itemWrapper-element-container-name-required">
                {props.isFirstpage ? <> </> : <>*</>}
              </span>
            ) : (
              <> </>
            )}
          </>
        </span>
        {props.data.isSelect ? (
          <select
            className="edditprofile-body-itemWrapper-element-container-select
          edditprofile-body-itemWrapper-element-container-input"
            onChange={dropOnChangeValue}>
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
