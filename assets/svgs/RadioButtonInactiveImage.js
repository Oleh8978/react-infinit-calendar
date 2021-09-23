import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function RadioButtomImageInactive(props) {
  return (
    <Svg width={16} height={16} {...props} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M8 2.375C9.50312 2.375 10.9156 2.95937 11.9781 4.02187C13.0406 5.08437 13.625 6.49687 13.625 8C13.625 9.50312 13.0406 10.9156 11.9781 11.9781C10.9156 13.0406 9.50312 13.625 8 13.625C6.49687 13.625 5.08437 13.0406 4.02187 11.9781C2.95937 10.9156 2.375 9.50312 2.375 8C2.375 6.49687 2.95937 5.08437 4.02187 4.02187C5.08437 2.95937 6.49687 2.375 8 2.375ZM8 1.5C4.40937 1.5 1.5 4.40937 1.5 8C1.5 11.5906 4.40937 14.5 8 14.5C11.5906 14.5 14.5 11.5906 14.5 8C14.5 4.40937 11.5906 1.5 8 1.5Z" fill="#848CA5"/>
    </Svg>
  );
}

export default RadioButtomImageInactive;