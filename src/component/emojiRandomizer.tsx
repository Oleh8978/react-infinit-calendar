import React, { useEffect, useState } from 'react';
import { createUUID } from '@app/view/Helpers/utils';
import emoji1 from '../asset/images/emoji/🤗.png';
import emoji2 from '../asset/images/emoji/⚡.png';
import emoji3 from '../asset/images/emoji/✅.png';
import emoji4 from '../asset/images/emoji/✌️.png';
import emoji5 from '../asset/images/emoji/✨.png';
import emoji6 from '../asset/images/emoji/✔️.png';
import emoji7 from '../asset/images/emoji/⭐.png';
import emoji8 from '../asset/images/emoji/🎈.png';
import emoji9 from '../asset/images/emoji/🎉.png';
import emoji10 from '../asset/images/emoji/🎊.png';
import emoji11 from '../asset/images/emoji/👊.png';
import emoji12 from '../asset/images/emoji/👌.png';
import emoji13 from '../asset/images/emoji/👍.png';
import emoji14 from '../asset/images/emoji/👏.png';
import emoji15 from '../asset/images/emoji/💥.png';
import emoji16 from '../asset/images/emoji/🔥.png';
import emoji17 from '../asset/images/emoji/😃.png';
import emoji18 from '../asset/images/emoji/😉.png';
import emoji19 from '../asset/images/emoji/🙂.png';
import emoji20 from '../asset/images/emoji/🙌.png';
import emoji21 from '../asset/images/emoji/🤗.png';
import emoji22 from '../asset/images/emoji/🤘.png';

export const emojiSet = [
  { id: createUUID(), img: emoji1 },
  { id: createUUID(), img: emoji2 },
  { id: createUUID(), img: emoji3 },
  { id: createUUID(), img: emoji4 },
  { id: createUUID(), img: emoji5 },
  { id: createUUID(), img: emoji6 },
  { id: createUUID(), img: emoji7 },
  { id: createUUID(), img: emoji8 },
  { id: createUUID(), img: emoji9 },
  { id: createUUID(), img: emoji10 },
  { id: createUUID(), img: emoji11 },
  { id: createUUID(), img: emoji12 },
  { id: createUUID(), img: emoji13 },
  { id: createUUID(), img: emoji14 },
  { id: createUUID(), img: emoji15 },
  { id: createUUID(), img: emoji16 },
  { id: createUUID(), img: emoji17 },
  { id: createUUID(), img: emoji18 },
  { id: createUUID(), img: emoji19 },
  { id: createUUID(), img: emoji20 },
  { id: createUUID(), img: emoji21 },
  { id: createUUID(), img: emoji22 },
];

interface IProps {}

const EmojiRandomizer: React.FC<IProps> = ({ ...props }) => {
  const [randomEmojiIndex, setRandomEmojiIndex] = useState<number>(undefined);

  useEffect(() => {
    setRandomEmojiIndex(Math.floor(Math.random() * emojiSet.length))
  }, [])

  return (
    <>
      {randomEmojiIndex !== undefined ? <img className={'emoji'} src={emojiSet[randomEmojiIndex].img} alt='' /> : <></>}
    </>
    );
}

export default EmojiRandomizer;
