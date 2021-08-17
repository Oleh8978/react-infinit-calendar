import React, { useEffect, useState } from 'react';

// components
import NotesListItem from './ListItem';
import Loader from '@app/component/Loader';

// interfaces
import { NoteDTO } from '@ternala/frasier-types';

interface IProps {
  data: NoteDTO[];
  counts: number;
}

const NotesList: React.FC<IProps> = ({ ...props }) => {
  console.log('list data ', props.data);
  return (
    <div className={'notes-list'}>
      {props.data.map((item) => {
        return <NotesListItem data={item} key={item.id} />;
      })}
      {props.counts !== props.data.length ? (
        <div style={{ height: '30px', width: '100%' }}>
          {' '}
          <Loader isSmall={true} />{' '}
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default NotesList;
