import React from 'react';

// components
import NavigationBar from 'Component/NavigationBar';
import NotesList from './List';

// fakedata
import { data } from './fakeData/fakeData';

interface IProps {}

const Notes: React.FC<IProps> = () => {
  return (
    <div className={'notes'}>
      <NavigationBar rout={'account'} name={'My Notes'} hasSaveButton={false} />
      <NotesList data={data} />
    </div>
  );
};

export default Notes;
