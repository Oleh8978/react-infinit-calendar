import React, { useEffect } from 'react';

interface IProps {
  sqSize: number;
  percentage: number;
  strokeColor: string;
}

const CircularProgressBar: React.FC<IProps> = ({ ...props }) => {
  const sqSize = props.sqSize;
  const radius = (props.sqSize - 10) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  let dashOffset;

  useEffect(() => {
    const progressBar = document.getElementById(
      `progressbar${props.percentage}`,
    );
    let percent = 1;
    const interval = setInterval(function () {
      percent++;
      dashOffset = dashArray - (dashArray * percent) / 100;
      progressBar.style.strokeDashoffset = dashOffset;
      if (percent === props.percentage) {
        clearInterval(interval);
      }

      return dashOffset;
    }, 30);
  }, []);
  //const dashOffset = dashArray - dashArray * props.percentage / 100;

  return (
    <>
      <div className="circular-chart">
        <svg width={props.sqSize} height={props.sqSize} viewBox={viewBox}>
          <circle
            className="circle-background"
            cx={props.sqSize / 2}
            cy={props.sqSize / 2}
            r={radius}
            strokeWidth={`10px`}
          />
          <circle
            className="circle-progress"
            id={`progressbar${props.percentage}`}
            cx={props.sqSize / 2}
            cy={props.sqSize / 2}
            r={radius}
            strokeWidth={`10px`}
            // Start progress marker at 12 O'Clock
            transform={`rotate(-90 ${props.sqSize / 2} ${props.sqSize / 2})`}
            style={{
              strokeDasharray: dashArray,
              stroke: props.strokeColor,
            }}
          />
          <text
            className="circle-text"
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle">
            {`${props.percentage}%`}
          </text>
        </svg>
      </div>
    </>
  );
};

export default CircularProgressBar;
