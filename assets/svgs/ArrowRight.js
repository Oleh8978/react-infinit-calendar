import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ArrowRight(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M5 13a1 1 0 110-2h14a1 1 0 110 2H5z" fill="#7843C5" />
      <Path
        d="M11.293 5.707a1 1 0 011.414-1.414l7 7a1 1 0 010 1.414l-7 7a1 1 0 01-1.414-1.414L17.586 12l-6.293-6.293z"
        fill="#7843C5"
      />
    </Svg>
  );
}

export default ArrowRight;
