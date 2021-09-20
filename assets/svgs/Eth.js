import * as React from 'react';
import Svg, {
  G, Circle, Path,
} from 'react-native-svg';

function Eth(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} {...props}>
      <G fill="none" fillRule="evenodd">
        <Circle cx={16} cy={16} r={16} fill="#627EEA" />
        <G fill="#FFF" fillRule="nonzero">
          <Path fillOpacity={0.602} d="M16.498 4v8.87l7.497 3.35z" />
          <Path d="M16.498 4L9 16.22l7.498-3.35z" />
          <Path fillOpacity={0.602} d="M16.498 21.968v6.027L24 17.616z" />
          <Path d="M16.498 27.995v-6.028L9 17.616z" />
          <Path fillOpacity={0.2} d="M16.498 20.573l7.497-4.353-7.497-3.348z" />
          <Path fillOpacity={0.602} d="M9 16.22l7.498 4.353v-7.701z" />
        </G>
      </G>
    </Svg>
  );
}

export default Eth;
