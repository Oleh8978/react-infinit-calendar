import React from 'react';

// components
import EdditProfileBodyComponent from './EditProfileComponents/EditProfileItemBody';

// data schema
import * as editList from './static';

interface IProps {
  
}

const BodyEdditProfile: React.FC<IProps> = () => {
  return (
    <div className={'edditprofile-body'}>
      <EdditProfileBodyComponent data={editList.PersonalInfo} />
      <EdditProfileBodyComponent data={editList.BillingAddress} />
      <EdditProfileBodyComponent data={editList.TimingSettings} />
    </div>
  );
};

export default BodyEdditProfile;