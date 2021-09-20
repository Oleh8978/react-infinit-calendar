import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function WithdrawWhite(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11 0c6.1 0 11 4.9 11 11s-4.9 11-11 11S0 17.1 0 11 4.9 0 11 0z"
        fill="#fff"
      />
      <Path d="M11 2c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9z" fill="#FF3D00" />
      <Path
        d="M13.827 7.182c.566 0 .99.424.99.99 0 .565-.424.99-.99.99h-3.252l3.96 3.96c.424.424.424.99 0 1.414-.425.424-.99.424-1.415 0l-3.96-3.96v3.252c0 .566-.424.99-.99.99a.967.967 0 01-.99-.99V8.172c0-.142 0-.283.071-.354 0-.141.142-.283.212-.354.071-.07.212-.212.354-.212.07-.07.212-.07.353-.07h5.657z"
        fill="#fff"
      />
    </Svg>
  );
}

export default WithdrawWhite;
