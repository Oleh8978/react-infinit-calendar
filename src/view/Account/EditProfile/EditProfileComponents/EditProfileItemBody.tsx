import React from 'react';

// components
import EdditBodyElementItem from './EditProfileItem';

// interfaces
import { IData, IZonesModified } from '../Models';
import { IUser } from '@app/controller/auth/model';

interface IProps {
  data: IData;
  timeZones?: IZonesModified[];
  isFirstpage?: boolean;
  user?: IUser;
  validatorFunctionality?: (key: string, value: string) => void;
  setObjectState?: (key: string, value: string) => void;
  observer?: () => void;
  validationState?: any[];
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
            return (
              <EdditBodyElementItem
                data={item}
                timeZones={props.timeZones}
                isFirstpage={props.isFirstpage}
                user={props.user}
                validatorFunctionality={props.validatorFunctionality}
                setObjectState={props.setObjectState}
                validationState={props.validationState}
                observer={props.observer}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EdditProfileBodyComponent;
