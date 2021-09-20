import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Deposit(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="#fff" d="M0 0h24v24H0z" />
      <Path
        d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1z"
        fill="#5BCE89"
      />
      <Path d="M12 21c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z" fill="#5BCE89" />
      <Path fill="#fff" d="M0 0h24v24H0z" />
      <Path
        d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1z"
        fill="#5BCE89"
      />
      <Path d="M12 21c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z" fill="#fff" />
      <Path
        d="M17 12c0 .6-.4 1-1 1h-3v3c0 .6-.4 1-1 1s-1-.4-1-1v-3H8c-.6 0-1-.4-1-1s.4-1 1-1h3V8c0-.6.4-1 1-1s1 .4 1 1v3h3c.6 0 1 .4 1 1z"
        fill="#5BCE89"
      />
    </Svg>
  );
}

export default Deposit;
