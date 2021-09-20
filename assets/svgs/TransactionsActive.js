import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function TransactionsActive(props) {
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
        d="M13.1 13.6c-.1.1-.1.3-.1.4v6c0 .6.4 1 1 1s1-.4 1-1v-3.6l5.3 5.3c.2.2.4.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1 0-1.4L16.4 15H20c.6 0 1-.4 1-1s-.4-1-1-1h-6c-.1 0-.3 0-.4.1-.2.1-.4.3-.5.5zM2.3 2.3c.4-.4 1-.4 1.4 0L9 7.6V4c0-.6.4-1 1-1s1 .4 1 1v6c0 .1 0 .3-.1.4-.1.2-.3.4-.5.5-.1.1-.3.1-.4.1H4c-.6 0-1-.4-1-1s.4-1 1-1h3.6L2.3 3.7c-.4-.4-.4-1 0-1.4z"
        fill="#7843C5"
      />
    </Svg>
  );
}

export default TransactionsActive;
