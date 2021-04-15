import React from 'react';

export interface IProps {
  className?: string;
}

const icon: React.FC<IProps> = ({ className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0)">
        <path
          d="M18.896 3.53445e-08H1.10306C0.493774 0.000305211 -0.000152553 0.494537 3.53445e-08 1.10397V18.8969C0.000305211 19.5062 0.494537 20.0002 1.10397 20H18.896C19.5056 20.0002 19.9998 19.5061 20 18.8965C20 18.8963 20 18.8962 20 18.896V1.10306C19.9997 0.493774 19.5055 -0.000152553 18.896 3.53445e-08Z"
          fill="#4267B2"
        />
        <path
          d="M13.8086 21.9795V14.2451H16.416L16.8066 11.2178H13.8086V9.2897C13.8086 8.41522 14.0514 7.81937 15.3053 7.81937H16.8945V5.11902C16.618 5.08224 15.6694 5 14.5656 5C12.2609 5 10.6836 6.40625 10.6836 8.98987V11.2178H8.08594V14.2451H10.6836V21.9795H13.8086Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default icon;
