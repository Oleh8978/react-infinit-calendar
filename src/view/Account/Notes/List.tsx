import React, { useEffect, useState } from 'react';

// components
import NotesListItem from './ListItem';
import Loader from '@app/component/Loader';

// interfaces
import { NoteDTO } from '@ternala/frasier-types';
import { IListItem } from './Models';

interface IProps {
  data: NoteDTO[];
  isSmallLoader: boolean;
}

const NotesList: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'notes-list'}>
      {props.data.map((item) => {
        return <NotesListItem data={item} key={item.id} />;
      })}
      {props.isSmallLoader ? <Loader isSmall={true} /> : <> </>}
    </div>
  );
};

export default NotesList;
