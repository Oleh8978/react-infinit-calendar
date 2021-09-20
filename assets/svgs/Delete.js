import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Delete(props) {
  return (
    <Svg
      width={45}
      height={23}
      viewBox="0 0 45 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.325 11.5L10.455 1H44v21H10.456l-9.13-10.5zM15.063 5.313l12 12M15.063 17.688l12-12"
        stroke="#7843C5"
        strokeWidth={2}
      />
    </Svg>
  );
}

export default Delete;
