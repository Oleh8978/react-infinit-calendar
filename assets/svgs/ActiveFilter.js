import * as React from 'react';
import Svg, {
  Path, Mask, G,
} from 'react-native-svg';

function ActiveFilter(props) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.009 2c.4 0 .7.2.9.6.2.3.1.7-.1 1l-7.8 9.2V21c0 .4-.2.7-.5.9-.1.1-.3.1-.5.1s-.3 0-.4-.1l-4-2c-.4-.2-.6-.5-.6-.9v-6.2l-7.8-9.2c-.2-.3-.3-.7-.1-1 .2-.4.5-.6.9-.6h20zm-9 10.5c0-.3.1-.5.2-.7l6.7-7.8h-15.7l6.6 7.9c.1.1.2.4.2.6v5.9l2 1v-6.9z"
        fill="#7843C5"
      />
      <Mask
        id="prefix__a"
        maskUnits="userSpaceOnUse"
        x={1}
        y={2}
        width={23}
        height={20}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.009 2c.4 0 .7.2.9.6.2.3.1.7-.1 1l-7.8 9.2V21c0 .4-.2.7-.5.9-.1.1-.3.1-.5.1s-.3 0-.4-.1l-4-2c-.4-.2-.6-.5-.6-.9v-6.2l-7.8-9.2c-.2-.3-.3-.7-.1-1 .2-.4.5-.6.9-.6h20zm-9 10.5c0-.3.1-.5.2-.7l6.7-7.8h-15.7l6.6 7.9c.1.1.2.4.2.6v5.9l2 1v-6.9z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#prefix__a)">
        <Path fill="#7843C5" d="M0 0h24v24H0z" />
      </G>
    </Svg>
  );
}

export default ActiveFilter;
