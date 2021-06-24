import React from 'react';

interface IProps {
  title: string;
  img?: string;
  duration?: number;
  maxDaySpent?: number;
  minDaySpent?: number;
  isEndless?: boolean;
  price: number;
}

const CheckoutBody: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'checkout-body-wrapper'}>
      <div className={'checkout-body-wrapper-img-wrap'}>
        <img src={props.img} alt='' className='checkout-body-wrapper-img' />
      </div>
      <div className={'checkout-body-wrapper-title'}>
        <span className={'checkout-body-wrapper-title-text'}>
          {props.title}
        </span>
      </div>
      <div className='checkout-body-wrapper-timing'>
        <span className='checkout-body-wrapper-timing-hours'>
          {props.isEndless ? `Endless` : `${Math.round(props.duration / 60)} hrs`}
        </span>
        <span className='checkout-body-wrapper-timing-text'>duration</span>
      </div>
      <div className='checkout-body-wrapper-timing'>
        <span className='checkout-body-wrapper-timing-hours'>
          {props.minDaySpent && props.maxDaySpent ?
            (`${Math.round(props.minDaySpent / 60)} - ${Math.round(props.maxDaySpent / 60)}`) :
            ('')}
        </span>
        <span className='checkout-body-wrapper-timing-text'>hrs of effort per day</span>
      </div>
      <div className='checkout-body-wrapper-price'>
        <span className='checkout-body-wrapper-price-number'>
          ${props.price}
        </span>
        <span className='checkout-body-wrapper-price-text'>price</span>
      </div>
    </div>
  );
};

export default CheckoutBody;
