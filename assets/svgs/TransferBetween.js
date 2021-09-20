import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

function TransferBetween(props) {
  return (
    <Svg
      width={54}
      height={54}
      viewBox="0 0 54 54"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect x={0.5} y={0.5} width={53} height={53} rx={26.5} stroke="#7843C5" />
      <Path
        d="M38 32l-4 4-4-4"
        stroke="#7843C5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M28 18h2a4 4 0 014 4v14M16 22l4-4 4 4"
        stroke="#7843C5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M26 36h-2a4 4 0 01-4-4V18"
        stroke="#7843C5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default TransferBetween;
