import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Attention(props) {
  return (
    <Svg
      width={24}
      height={20}
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M23.598 15.287l-8.605-13.6C14.391.63 13.273 0 12 0S9.61.63 9.007 1.687l-8.605 13.6C-.8 17.423.839 20 3.404 20h17.192c2.563 0 4.205-2.575 3.002-4.713z"
        fill="#fff"
      />
      <Path
        d="M11 5.833a.833.833 0 011.667 0v7.5a.833.833 0 11-1.667 0v-7.5zM11 15.833a.833.833 0 111.667 0 .833.833 0 01-1.667 0z"
        fill="#FF5B5B"
      />
    </Svg>
  );
}

export default Attention;
