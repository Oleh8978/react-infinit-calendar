import * as React from 'react';
import Svg, {
  Path, Mask, G,
} from 'react-native-svg';

function Email(props) {
  return (
    <Svg
      width={28}
      height={20}
      viewBox="0 0 28 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M0 2.308C0 1.033 1.045 0 2.333 0h23.334C26.955 0 28 1.033 28 2.308v15.384C28 18.967 26.955 20 25.667 20H2.333C1.045 20 0 18.967 0 17.692V2.308z"
        fill="#AAC4FF"
      />
      <Mask
        id="prefix__a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={28}
        height={20}
      >
        <Path
          d="M0 2.308C0 1.033 1.045 0 2.333 0h23.334C26.955 0 28 1.033 28 2.308v15.384C28 18.967 26.955 20 25.667 20H2.333C1.045 20 0 18.967 0 17.692V2.308z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#prefix__a)">
        <Path
          d="M28 3.182l-14 9.126L0 2.86v-.552C0 1.065.993.052 2.237.002L14 8.077 26.116.043A2.315 2.315 0 0128 2.308v.874z"
          fill="#fff"
        />
      </G>
    </Svg>
  );
}

export default Email;
