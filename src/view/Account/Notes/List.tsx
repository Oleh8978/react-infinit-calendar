import React, { useEffect, useState } from 'react';

import NotesListItem from './ListItem';

// interfaces
import { IListItem } from './Models';

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
