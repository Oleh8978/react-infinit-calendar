import React from 'react';

// types
import { Pages } from '@app/routing/schema';

// components
import EdditBodyElementItem from './EditProfileItem';

// interfaces
import { IData, IZones } from '../Models';
import { IUser } from '@app/controller/auth/model';
import { IvalidatorState } from '../../../LoginPages/utils/models';

interface IProps {
  data: IData;
  timeZones?: IZones[];
  isFirstpage?: boolean;
  user?: IUser;
  validatorFunctionality?: (key: string, value: string) => void;
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
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EdditProfileBodyComponent;
