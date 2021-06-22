import React from 'react';

export interface IProps {}

const Mail: React.FC<IProps> = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0)">
        <path
          d="M15.2423 2.42871H0.756592L7.99945 8.3946L15.3242 2.44543C15.2974 2.43759 15.27 2.43201 15.2423 2.42871Z"
          fill="white"
        />
        <path
          d="M8.35124 9.54674C8.14597 9.71483 7.85063 9.71483 7.64536 9.54674L0.199707 3.4126V13.0144C0.199707 13.3221 0.449148 13.5715 0.75686 13.5715H15.2426C15.5503 13.5715 15.7997 13.3221 15.7997 13.0144V3.49506L8.35124 9.54674Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width="15.6"
            height="15.6"
            fill="white"
            transform="translate(0.199707 0.200195)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Mail;
