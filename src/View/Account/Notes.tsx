import React, { useState, useEffect } from 'react';

// static
import note from "./static/note.svg"

interface IProps {}

const Notes: React.FC<IProps> = () => {
    const [numberOfNotes, setNumberOfNotes] = useState<number>(49)
  return (
    <div className={'profile-journey-notes'}>
      <div className={'profile-journey-notes-wrapper'}>
        <span className={'profile-journey-notes-header'}>My notes</span>

        <div className={'profile-journey-notes-textwrapper'}>
          <span className={'profile-journey-notes-text'}>{numberOfNotes} Notes</span>
          <img className={'profile-journey-notes-img'} src={note} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default Notes;
