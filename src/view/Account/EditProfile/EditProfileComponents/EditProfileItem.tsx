import React, { useState, useEffect } from 'react';
import moment from 'moment';
import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

// interfaces
import { IItem, IZones, IZonesModified } from '../Models';
import { IUser } from '@app/controller/auth/model';

// enum
import { TimezoneTypeEnum } from '@ternala/frasier-types/lib/constants/main';

// utils
import { entryValidator, timeZoneReturner } from './utils/utils';

interface IProps {
  data: IItem;
  timeZones?: IZonesModified[];
  isFirstpage?: boolean;
  user?: IUser;
  validatorFunctionality?: (key: string, value: string) => void;
  setObjectState?: (key: string, value: string) => void;
  observer?: () => void;
  validationState?: any[];
}

const useStyles = makeStyles({
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
  input: {
    padding: '0px',
  },
});

const EdditBodyElementItem: React.FC<IProps> = ({ ...props }) => {
  const classes = useStyles();
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [valueSelect, setValueSelect] = useState<TimezoneTypeEnum>(
    timeZoneReturner(props.user.userData.timezone),
  );

  useEffect(() => {
    if (props.user) {
      itemIterator();
    }
  }, [props.user]);

  const validator = (key: string, value: string) => {
    if (value !== null && value !== 'null') {
      props.validatorFunctionality(key, String(value).trim());
    } else {
      props.validatorFunctionality(key, '');
    }
  };

  const itemIterator = () => {
    if (props.user !== undefined && props.data.subname !== undefined) {
      for (const [key, value] of Object.entries(props.user.userData)) {
        if (
          props.data.subname.toLowerCase() === String(key.toLowerCase()) &&
          value !== null
        ) {
          value !== 'null' ? validator(key, value) : validator(key, '');
          return value !== 'null'
            ? setValue(String(value))
            : setValue(String(''));
        }
      }
    }
  };

  const handleChange = (event) => {
    props.setObjectState(props.data.subname, event.target.value);
    setValue(entryValidator(props.data.subname, event.target.value));
    validator(props.data.subname, event.target.value);
  };

  const dropOnChangeValue = (event) => {
    setValueSelect(timeZoneReturner(event.target.value));
    validator(props.data.subname, timeZoneReturner(event.target.value));
    props.observer();
    props.setObjectState(
      props.data.subname,
      timeZoneReturner(event.target.value),
    );
  };

  const validate = () => {
    value ? setError(false) : setError(true);
  };

  const timeSetter = (value1, value2) => {
    if (value2 && !value1) {
      return moment().startOf('day').add(value2, 'minutes').format('hh:mm');
    }

    if (value1) {
      return moment().startOf('day').add(value1, 'minutes').format('hh:mm');
    }

    if (value2 && value1) {
      return moment().startOf('day').add(value1, 'minutes').format('hh:mm');
    }
  };

  const valueForInput = (value: string | number) => {
    if (typeof value === 'string') {
      return value !== 'null' ? props.data.default : '';
    } else {
      return value;
    }
  };

  const fieldReturner = () => {
    if (props.data.subname === 'phone') {
      return (
        <InputMask
          maskChar={null}
          mask={'+9-999-999-9999'}
          onChange={handleChange}
          value={value || props.data.default}
          className="edditprofile-body-itemWrapper-element-container-input"
        />
      );
    } else if (props.data.subname === 'email') {
      return (
        <>
          <input
            onBlur={props.data.isRequired ? validate : null}
            onChange={handleChange}
            type={props.data.isEmail ? 'email' : 'text'}
            className="edditprofile-body-itemWrapper-element-container-input"
            placeholder={props.data.name}
            value={value || valueForInput(props.data.default)}
          />
        </>
      );
    } else if (props.data.subname === 'startTime') {
      return (
        <div className="clock-input-wrapper">
          <TextField
            id="time"
            type="time"
            defaultValue={timeSetter(
              props.user.userData.startTime,
              props.data.default,
            )}
            onChange={handleChange}
            className="edditprofile-body-itemWrapper-element-container-input"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes,
            }}
          />
        </div>
      );
    } else if (props.data.isSelect) {
      return (
        <select
          className="edditprofile-body-itemWrapper-element-container-select
    edditprofile-body-itemWrapper-element-container-input"
          onChange={dropOnChangeValue}
          value={valueSelect}>
          {props.timeZones.map((item) => {
            return (
              <option value={item.subname}>
                ({item.offset}) {item.name}
              </option>
            );
          })}
        </select>
      );
    } else if (props.data.subname === 'zipCode') {
      return (
        <InputMask
          maskChar={null}
          mask={'999999999'}
          onChange={handleChange}
          value={value || props.data.default}
          className="edditprofile-body-itemWrapper-element-container-input"
        />
      );
    } else {
      return (
        <>
          <input
            onBlur={props.data.isRequired ? validate : null}
            onChange={handleChange}
            type={props.data.isEmail ? 'email' : 'text'}
            className="edditprofile-body-itemWrapper-element-container-input"
            placeholder={props.data.name}
            value={value || valueForInput(props.data.default)}
          />
        </>
      );
    }
  };

  const colorSetter = () => {
    if (props.validationState !== undefined) {
      if (props.validationState.length === 0) {
        return;
      }

      const elem = props.validationState.filter(
        (item) => item.name === props.data.subname,
      );

      if (elem[0].isValid === false || elem[0].hasAnyError === true) {
        return 'red';
      }

      return '#E9E9E9';
    }
  };
  return (
    <div
      className={'edditprofile-body-itemWrapper-element'}
      style={{ borderBottom: `1px solid ${colorSetter()}` }}>
      <div className="edditprofile-body-itemWrapper-element-container">
        <span
          className={`edditprofile-body-itemWrapper-element-container-name`}>
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
        <>{fieldReturner()}</>
      </div>
    </div>
  );
};

export default EdditBodyElementItem;
