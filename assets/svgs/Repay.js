import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Repay(props) {
  return (
    <Svg
      width={18}
      height={22}
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.7 15.7c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l2.3-2.3H9c-.6 0-1-.4-1-1s.4-1 1-1h5.6l-2.3-2.3c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l4 4c.1.1.2.2.2.3.1.1.1.3.1.4 0 .1 0 .3-.1.4 0 .1-.1.2-.2.3l-4 4z"
        fill="#FFA53B"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 2a9 9 0 000 18 1 1 0 110 2C4.925 22 0 17.075 0 11S4.925 0 11 0a1 1 0 110 2z"
        fill="#FFA53B"
      />
    </Svg>
  );
}

export default Repay;
