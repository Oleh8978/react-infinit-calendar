import React, { useEffect, useState } from 'react';

// components
import Link from 'routing/Link';

import NotesListItem from './ListItem';

// interfaces
import { IListItem } from './Models';

// fake data 
import { data } from 'view/Schedule/fakeData/fakedata';

interface IProps {
  data: IListItem[];
}

const NotesList: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'notes-list'}>
      {props.data.map((item) => {
        return <NotesListItem data={item} key={item.id} />;
      })}
    </div>
  );
};

export default NotesList;
