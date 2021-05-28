import React, { useEffect } from 'react';
import { createUUID } from '../View/Helpers/utils';

interface IProps {
  bubbleValue: string;
  neededPercent: number;
  isGreen?: boolean;
}

const WavePercentage: React.FC<IProps> = ({...props}) => {
  const id = createUUID();

  useEffect(()=> {
    const water = document.getElementById(`water${id}`);
    let percent = 0;
    const interval = setInterval(function(){
      percent++;
      water.style.transform='translate(0'+','+(100-percent)+'%)';
      if(percent === props.neededPercent){
        clearInterval(interval);
      }
    },35);
  }, []);

  return (
    <>
      <div className={`box ${props.isGreen ? 'box-green' : ''}`}>
        <div className='percent'>
          <div className='percentNum'>{props.bubbleValue}</div>
        </div>
        <div id={`water${id}`} className='water'>
          <svg viewBox='0 0 560 20' className='water_wave water_wave_front'>
            <path
              d='M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z'></path>
            <path
              d='M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z'></path>
            <path
              d='M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z'></path>
            <path
              d='M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z'></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default WavePercentage;
