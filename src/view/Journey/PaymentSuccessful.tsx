import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

interface IProps {
  rout?: string;
}

const PaymentSuccessful: React.FC<IProps> = ({ rout }) => {
  const dispatch = useDispatch();
  return (
    <div className={'payment-failed payment-successful'}>
      <span className="payment-failed-title">Payment was successful</span>
      <span className="payment-failed-text">
        Please go to the journey page in order to start it.
      </span>
      <button
        className="jorneydiscoveymain-bottom-pink-full"
        onClick={() => dispatch(push(rout))}>
        <span className="jorneydiscoveymain-bottom-pink-full-text-price">
          Visit the Journey
        </span>
      </button>
    </div>
  );
};

export default PaymentSuccessful;
