import React from 'react';

export interface IProps {
  className?: string;
}

const icon: React.FC<IProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 23.75C18.7132 23.75 23.75 18.7132 23.75 12.5C23.75 6.2868 18.7132 1.25 12.5 1.25C6.2868 1.25 1.25 6.2868 1.25 12.5C1.25 18.7132 6.2868 23.75 12.5 23.75ZM12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25Z"
        fill="#1D1D1D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.6104 8.23945C16.8924 8.4385 16.9597 8.82848 16.7606 9.11048L11.488 16.58L7.06664 12.3254C6.81791 12.0861 6.8103 11.6904 7.04964 11.4417C7.28898 11.193 7.68464 11.1854 7.93336 11.4247L11.3061 14.6701L15.7394 8.38962C15.9385 8.10763 16.3284 8.04039 16.6104 8.23945Z"
        fill="#1D1D1D"
      />
    </svg>
  );
};

export default icon;