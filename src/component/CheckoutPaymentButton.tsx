import React from 'react';
interface IProps {
  redirectToPayPal: () => void;
}

const CheckoutPayment: React.FC<IProps> = ({ redirectToPayPal }) => {
  return (
    <button
      className="checkout-payment-button"
      onClick={() => redirectToPayPal()}>
      <span className="checkout-payment-button-text">PayPal</span>
    </button>
  );
};

export default CheckoutPayment;
