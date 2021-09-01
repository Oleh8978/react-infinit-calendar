import React, { useEffect, useState, useRef } from 'react';

export interface IProps {
  size?: number;
  progress?: number;
  strokeWidth?: number;
  strokeColor?: string;
  circleOneStroke?: string;
  circleTwoStroke?: string;
}

const CircularProgressBar: React.FC<IProps> = (props) => {
  const [offset, setOffset] = useState(0);
  const circleRef = useRef(null);
  const {
    size = 110,
    progress = 1,
    strokeWidth = 10,
    strokeColor,
    circleOneStroke = 'green',
    circleTwoStroke = 'white',
  } = props;

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);
    circleRef.current.style =
      'transition: stroke-dashoffset 850ms ease-in-out;';
  }, [setOffset, circumference, progress, offset]);

  return (
    <>
      <svg
        className="circular-chart"
        width={size}
        height={size}
        viewBox={`0 0 116 116`}>
        <circle
          className="circle-background"
          stroke={circleOneStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="circle-progress"
          ref={circleRef}
          stroke={strokeColor}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          className="circle-text">
          {progress}%
        </text>
      </svg>
    </>
  );
};

export default CircularProgressBar;
