import React, { useEffect, useState } from 'react';

interface IProps {
}

const CheckoutPayment: React.FC<IProps> = ({ ...props }) => {

  return (
      <button className='checkout-payment-button'>
        <span className='checkout-payment-button-text'>
          PayPal
        </span>
      </button>
  );
};

export default CheckoutPayment;
