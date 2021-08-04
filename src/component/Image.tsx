import React, { useState } from 'react';
import Loader from './Loader';

export interface IProps {
  src: string;
  className: string;
  isNeededLoader: boolean;
}

export const ImageL: React.FC<IProps> = ({ ...props }) => {
  const [loader, setLoader] = useState<boolean>(true);

  if (props.src === undefined && props.isNeededLoader === true) {
    return <Loader isSmall={true} />;
  }

  return (
    <>
      <img
        className={props.className}
        src={props.src}
        style={!loader ? { opacity: '1' } : {}}
        onLoad={() => {
          setLoader(false);
        }}
      />
    </>
  );
};

export default ImageL;
