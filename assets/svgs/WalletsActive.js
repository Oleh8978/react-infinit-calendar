import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function WalletsActive(props) {
  return (
    <Svg
      width={20}
      height={18}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17 4h-1V3a3 3 0 00-3-3H3a3 3 0 00-3 3v12a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zM3 2h10a1 1 0 011 1v1H3a1 1 0 010-2zm15 10h-1a1 1 0 010-2h1v2zm0-4h-1a3 3 0 000 6h1v1a1 1 0 01-1 1H3a1 1 0 01-1-1V5.83A3 3 0 003 6h14a1 1 0 011 1v1z"
        fill="#7843C5"
      />
    </Svg>
  );
}

export default WalletsActive;
