import React from 'react';

// types
import { Pages } from '@app/routing/schema';

// components
import NavigationBar from '@app/component/NavigationBar';
import BodyEdditProfile from './BodyEdditProfile';

interface IProps {}

const EdditProfile: React.FC<IProps> = () => {
  const settings: Pages = 'settings';
  return (
    <div className={'edditprofile'}>
      <NavigationBar
        name={'Edit Profile'}
        isEditProfile={true}
        page={settings}
        hasSaveButton={true}
        isSaveBTNActive={true}
      />
      <BodyEdditProfile isFirstpage={false} />
    </div>
  );
};

export default EdditProfile;
