import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

// static
import note from './static/note.svg';

// components
import Link from '@app/routing/Link';

// actions
import { getNotesList } from '@app/controller/notes/actions';

// interfaces
import { IStore } from '@app/controller/model';

interface IProps {
  counts: number;
}

const Notes: React.FC<any> = ({ ...props }) => {
  const [numberOfNotes, setNumberOfNotes] = useState<number>(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!props.countNotes) {
      dispatch(getNotesList.request({}));
    }

    if (props.countNotes !== undefined) {
      setNumberOfNotes(props.countNotes);
    }
  }, [props.countNotes]);

  if (numberOfNotes !== undefined && numberOfNotes === 0) {
    return <> </>;
  }

  if (numberOfNotes !== undefined) {
    return (
      <div className={'profile-journey-notes'}>
        <div className={'profile-journey-notes-wrapper'}>
          <span className={'profile-journey-notes-header'}>My notes</span>
          <Link className={'profile-journey-notes-textwrapper'} to={'notes'}>
            <span className={'profile-journey-notes-text'}>
              {numberOfNotes} Notes
            </span>
            <img className={'profile-journey-notes-img'} src={note} alt="img" />
          </Link>
        </div>
      </div>
    );
  }
  return <> </>;
};

export default connect(
  (state: IStore) => ({
    countNotes: state.notesListReducer.state.counts,
  }),
  { getNotesList },
)(Notes);
