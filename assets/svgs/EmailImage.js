import * as React from 'react';
import Svg, {
 Path, Defs, ClipPath, Rect, G,
} from 'react-native-svg';

function EmailImage(props) {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
      <G clip-path="url(#clip0)">
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 7.5H7.5C6.46875 7.5 5.63437 8.34375 5.63437 9.375L5.625 20.625C5.625 21.6562 6.46875 22.5 7.5 22.5H22.5C23.5312 22.5 24.375 21.6562 24.375 20.625V9.375C24.375 8.34375 23.5312 7.5 22.5 7.5ZM21.5625 20.625H8.4375C7.92188 20.625 7.5 20.2031 7.5 19.6875V11.25L14.0062 15.3188C14.6156 15.7031 15.3844 15.7031 15.9938 15.3188L22.5 11.25V19.6875C22.5 20.2031 22.0781 20.625 21.5625 20.625ZM15 14.0625L7.5 9.375H22.5L15 14.0625Z" fill="#6560E0" />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="18.75" height="15" fill="white" transform="translate(5.625 7.5)" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default EmailImage;
