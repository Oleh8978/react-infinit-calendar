import React, { useEffect, useState } from 'react';

interface IProps {
}

const CheckoutPayment: React.FC<IProps> = ({ ...props }) => {

  return (
    <div className='checkout-payment'>
      <button className='checkout-payment-button jorneydiscoveymain-bottom-yellow'>
        <span className='checkout-payment-button-text'>
          PayPal
        </span>
      </button>
    </div>
  );
};

export default CheckoutPayment;
