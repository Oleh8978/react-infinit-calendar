import React from 'react';

// components
import EdditProfileBodyComponent from './EditProfileComponents/EditProfileItemBody';
import DeletePageBTN from 'Component/DeletePageBTN';

// data schema
import * as editList from './static';

interface IProps {
  isFirstpage?: boolean;
}

const BodyEdditProfile: React.FC<IProps> = ({ ...props }) => {
  const deleteProfile = () => {
    console.log('deleted');
  };
  return (
    <div className={'edditprofile-body'}>
      <EdditProfileBodyComponent data={editList.PersonalInfo} />
      <EdditProfileBodyComponent data={editList.BillingAddress} />
      <EdditProfileBodyComponent
        data={editList.TimingSettings}
        timeZones={editList.aryIannaTimeZones}
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
