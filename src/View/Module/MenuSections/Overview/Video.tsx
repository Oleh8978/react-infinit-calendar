import React, { useState, useRef } from 'react';

// static
import play from 'View/Module/MenuSections/staticHardcoded/play.png';

interface IProps {
  link: string;
  img: string;
}

const VideoComponent: React.FC<IProps> = ({ ...props }) => {
  const [isOpened, setIsopned] = useState<boolean>(false);

  const onPlay = () => {
    if (!isOpened) {
      setIsopned(true);
    } else {
      setIsopned(false);
    }
  };

  return (
    <>
      <div className="overview-video">
        {isOpened ? (
          <iframe src={props.link}> </iframe>
        ) : (
          <div className="overview-video-wrapper"></div>
        )}
      </div>
    </>
  );
};

export default VideoComponent;
