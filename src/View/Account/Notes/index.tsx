import React from 'react';

// components
import NavigationBar from 'Component/NavigationBar';

interface IProps {}

const Notes: React.FC<IProps> = () => {
  return (
    <div className={'notes'}>
      <NavigationBar rout={'account'} name={'My Notes'} />
    </div>
  );
};

export default Notes;
