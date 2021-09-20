import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ChevronBottomBlue(props) {
  return (
    <Svg
      width={10}
      height={6}
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.78.22a.69.69 0 011.01 0 .777.777 0 010 1.06l-4.285 4.5a.69.69 0 01-1.01 0L.209 1.28a.777.777 0 010-1.06.69.69 0 011.01 0L5 4.19 8.78.22z"
        fill="#7843C5"
        opacity={0.5}
      />
    </Svg>
  );
}

export default ChevronBottomBlue;
