import React from 'react';

interface IProps {
}

const PaymentFailed: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'payment-failed'}>
      <span className='payment-failed-title'>your payment failed</span>
      <span className='payment-failed-text'>Please try again</span>
    </div>
  );
};

export default PaymentFailed;
