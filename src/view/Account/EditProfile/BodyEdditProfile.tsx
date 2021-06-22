import React from 'react';

// components
import EdditProfileBodyComponent from './EditProfileComponents/EditProfileItemBody';
import DeletePageBTN from '@app/component/DeletePageBTN';

// interfaces
import { IUser } from '@app/controller/auth/model';
import { IvalidatorState } from '../../LoginPages/utils/models';

// data schema
import * as editList from './static';

interface IProps {
  isFirstpage?: boolean;
  user?: IUser;
  validatorFunctionality?: (key: string, value: string) => void;
}

const BodyEdditProfile: React.FC<IProps> = ({ ...props }) => {
  const deleteProfile = () => {
    console.log('deleted');
  };

  return (
    <div className={'edditprofile-body'}>
      <EdditProfileBodyComponent
        data={editList.PersonalInfo}
        isFirstpage={props.isFirstpage}
        user={props.user}
        validatorFunctionality={props.validatorFunctionality}
      />
      {props.isFirstpage ? (
        <></>
      ) : (
        <EdditProfileBodyComponent
          data={editList.BillingAddress}
          isFirstpage={props.isFirstpage}
        />
      )}
      <EdditProfileBodyComponent
        data={editList.TimingSettings}
        timeZones={editList.aryIannaTimeZones}
        user={props.user}
        validatorFunctionality={props.validatorFunctionality}
      />
      {props.isFirstpage ? (
        <></>
      ) : (
        <>
          <DeletePageBTN text={'Delete account'} eventHandler={deleteProfile} />
        </>
      )}
    </div>
  );
};

export default BodyEdditProfile;
