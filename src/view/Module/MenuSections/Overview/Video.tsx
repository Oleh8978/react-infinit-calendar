import React, { useState } from 'react';

interface IProps {
  img?: string;
  title?: string;
  content: any;
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
          <div className="video-modal" onClick={onPlay}>
            {props.content}
          </div>
        ) : (
          <div className="overview-video-wrapper">
            {props.img ? (
              <>
                <img src={props.img} alt="" className="overview-video-bg" />
                <div className="overview-video-btn" onClick={onPlay} />
              </>
            ) : (
              <div className="overview-video-btn" onClick={onPlay}>
                {props.title}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default VideoComponent;
