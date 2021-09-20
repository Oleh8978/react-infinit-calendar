import * as React from 'react';
import Svg, {
  Path, Mask, G,
} from 'react-native-svg';

function ChevronLeftWhite(props) {
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
        d="M15.707 17.293a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 111.414 1.414L10.414 12l5.293 5.293z"
        fill="#fff"
      />
      <Mask
        id="prefix__a"
        maskUnits="userSpaceOnUse"
        x={8}
        y={5}
        width={8}
        height={14}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.707 17.293a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 111.414 1.414L10.414 12l5.293 5.293z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#prefix__a)">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </G>
    </Svg>
  );
}

export default ChevronLeftWhite;
