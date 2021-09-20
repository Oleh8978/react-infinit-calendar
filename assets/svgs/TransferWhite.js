import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function TransferWhite(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="#fff" d="M24 24H0V0h24z" />
      <Path
        d="M12 23c6.1 0 11-4.9 11-11S18.1 1 12 1 1 5.9 1 12s4.9 11 11 11z"
        fill="#5BCE89"
      />
      <Path d="M12 3c5 0 9 4 9 9s-4 9-9 9-9-4-9-9 4-9 9-9z" fill="#5C8BFF" />
      <Path fill="#5C8BFF" d="M24 24H0V0h24z" />
      <Path
        d="M12 23C5.9 23 1 18.1 1 12S5.9 1 12 1s11 4.9 11 11-4.9 11-11 11z"
        fill="#fff"
      />
      <Path d="M12 21c5 0 9-4 9-9s-4-9-9-9-9 4-9 9 4 9 9 9z" fill="#5C8BFF" />
      <Path
        d="M9.173 15.818a.967.967 0 01-.99-.99c0-.565.424-.99.99-.99h3.252l-3.96-3.96c-.424-.424-.424-.99 0-1.414.425-.424.99-.424 1.415 0l3.96 3.96V9.172c0-.566.424-.99.99-.99.565 0 .99.424.99.99v5.656c0 .142 0 .283-.071.354 0 .141-.142.283-.212.354-.071.07-.212.212-.354.212-.07.07-.212.07-.353.07H9.173z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}

export default TransferWhite;
