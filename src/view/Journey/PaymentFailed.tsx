import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import PaymentImage from '../../asset/images/payment-failed.png'

interface IProps {
  redirectToPayPal: () => void;
  rout?: string;
}

const PaymentFailed: React.FC<IProps> = ({ redirectToPayPal, rout }) => {
  const dispatch = useDispatch();

  return (
    <div className={'payment-failed'}>
      <span className='payment-failed-title'>your payment failed</span>
      <span className='payment-failed-text'>Please try again</span>
      <button className="jorneydiscoveymain-bottom-pink-full" onClick={() => redirectToPayPal()}>
        <span className="jorneydiscoveymain-bottom-pink-full-text-price">Try Again</span>
      </button>
      <button className="jorneydiscoveymain-bottom-pink" onClick={() => dispatch(push(rout))}>
        <span className="jorneydiscoveymain-bottom-pink-text">Back to Home</span>
      </button>
      <img src={PaymentImage} alt='' className='payment-failed-image' />
    </div>
  );
};

export default PaymentFailed;
