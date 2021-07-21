import React from 'react';
import EmojiRandomizer from '@app/component/emojiRandomizer';

interface IProps {}

const WellDone: React.FC<IProps> = () => {

  return (
    <div className={'welldone'}>
      <div className={'welldone-wrapper'}>
        <div className={'welldone-main'}>
          <h1 className={'welldone-header'}>WEll done!</h1>
          <span className={'welldone-text'}>
            You have completed all tasks for today
          </span>
          <span className={'welldone-smiles'}><EmojiRandomizer /> <EmojiRandomizer /></span>
        </div>
      </div>
    </div>
  );
};

export default WellDone;
