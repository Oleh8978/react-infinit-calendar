import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ChevronRightBlue(props) {
  return (
    <Svg
      width={7}
      height={12}
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.244 1.756A.833.833 0 011.423.578l5 5a.833.833 0 010 1.178l-5 5a.833.833 0 01-1.179-1.178l4.41-4.411-4.41-4.41z"
        fill="#7843C5"
      />
    </Svg>
  );
}

export default ChevronRightBlue;
