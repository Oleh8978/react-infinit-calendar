import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Dashboard(props) {
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
        d="M11.336 2.253a1 1 0 011.328 0l9 8a1 1 0 01-1.328 1.494L20 11.45V20a2 2 0 01-2 2H6a2 2 0 01-2-2v-8.55l-.336.297a1 1 0 01-1.328-1.494l9-8zM6 9.67V20h3v-7a2 2 0 012-2h2a2 2 0 012 2v7h3V9.671l-6-5.333-6 5.333zM13 20v-7h-2v7h2z"
        fill="#A19E9E"
      />
    </Svg>
  );
}

export default Dashboard;
