import * as React from 'react';
import Svg, {
 Path, Rect, ClipPath, Defs, G,
} from 'react-native-svg';

function Facebook(props) {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
      <G clip-path="url(#clip0)">
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M25.5 15.0619C25.5 9.22871 20.799 4.5 15 4.5C9.20101 4.5 4.5 9.22871 4.5 15.0619C4.5 20.3336 8.3397 24.7031 13.3594 25.4955V18.1149H10.6934V15.0619H13.3594V12.735C13.3594 10.0879 14.927 8.62574 17.3254 8.62574C18.4742 8.62574 19.6758 8.83202 19.6758 8.83202V11.4312H18.3518C17.0474 11.4312 16.6406 12.2454 16.6406 13.0806V15.0619H19.5527L19.0872 18.1149H16.6406V25.4955C21.6603 24.7031 25.5 20.3336 25.5 15.0619Z" fill="#1877F2" />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="21" height="21" fill="white" transform="translate(4.5 4.5)" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Facebook;
