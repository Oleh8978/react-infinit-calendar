import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ChevronLeftWhite(props) {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M6.66669 20L5.95958 19.2929L5.25247 20L5.95958 20.7071L6.66669 20ZM31.6667 21C32.219 21 32.6667 20.5523 32.6667 20C32.6667 19.4477 32.219 19 31.6667 19V21ZM15.9596 9.29289L5.95958 19.2929L7.37379 20.7071L17.3738 10.7071L15.9596 9.29289ZM5.95958 20.7071L15.9596 30.7071L17.3738 29.2929L7.37379 19.2929L5.95958 20.7071ZM6.66669 21H31.6667V19H6.66669V21Z" fill="white" />
    </Svg>
  );
}

export default ChevronLeftWhite;
