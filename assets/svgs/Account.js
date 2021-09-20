import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Account(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M21 19v2c0 .6-.4 1-1 1s-1-.4-1-1v-2c0-1.7-1.3-3-3-3H8c-1.7 0-3 1.3-3 3v2c0 .6-.4 1-1 1s-1-.4-1-1v-2c0-2.8 2.2-5 5-5h8c2.8 0 5 2.2 5 5z"
        fill="#A19E9E"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C9.2 2 7 4.2 7 7s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"
        fill="#A19E9E"
      />
    </Svg>
  );
}

export default Account;
