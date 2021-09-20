import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Facebook(props) {
  return (
    <Svg
      width={15}
      height={28}
      viewBox="0 0 15 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.017 15.631l.777-5.03H9.932V7.34c0-1.376.678-2.719 2.856-2.719H15V.34S12.993 0 11.075 0C7.07 0 4.452 2.41 4.452 6.769v3.833H0v5.03h4.452v12.157c.894.14 1.808.211 2.74.211.931 0 1.846-.071 2.74-.21V15.63h4.085z"
        fill="#5580EA"
      />
    </Svg>
  );
}

export default Facebook;
