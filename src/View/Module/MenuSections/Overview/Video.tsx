import React, { useState, useRef } from 'react';

// static
import play from 'View/Module/MenuSections/staticHardcoded/play.svg';
import videoBg from 'View/Module/MenuSections/staticHardcoded/video-bg.png';

interface IProps {
  link: string;
  img?: string;
  title?: string;
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
          <div className='video-modal' onClick={onPlay}>
            <iframe width={'95%'} scrolling={'yes'} src={props.link}> </iframe>
          </div>
        ) : (
          <div className="overview-video-wrapper">
            {props.img ? (<>
              <img src={videoBg} alt='' className='overview-video-bg' />
              <div className='overview-video-btn' onClick={onPlay}>
              </div>
            </>) : (
              <div className='overview-video-btn' onClick={onPlay}>
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
