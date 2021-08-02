import React, { useEffect, useState } from 'react';

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
  const [convertedPrice, setConvertedPrice] = useState<string>(
    String(props.price?.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  );

  useEffect(() => {
    setConvertedPrice(
      String(props.price?.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    );
  }, [props.price]);

  return (
    <>
      {props.price ? (
        <div className="checkout-body-wrap">
          <div className={'checkout-body'}>
            <div className={'checkout-body-img-wrap'}>
              <img src={props.img} alt="" className="checkout-body-img" />
            </div>
            <div className={'checkout-body-title'}>
              <span className={'checkout-body-title-text'}>{props.title}</span>
            </div>
            <div className="checkout-body-timing">
              <span className="checkout-body-timing-hours">
                {props.duration === 0
                  ? `Endless`
                  : `${Math.round(props.duration / 60)} hrs`}
              </span>
              <span className="checkout-body-timing-text">duration</span>
            </div>
            {props.minDaySpent || props.maxDaySpent ? (
              <div className="checkout-body-timing">
                <span className="checkout-body-timing-hours">
                  {props.minDaySpent && props.maxDaySpent
                    ? `${Math.round(props.minDaySpent / 60)} - ${Math.round(
                        props.maxDaySpent / 60,
                      )}`
                    : props.minDaySpent
                    ? Math.round(props.minDaySpent / 60)
                    : Math.round(props.maxDaySpent / 60)}
                </span>
                <span className="checkout-body-timing-text">
                  hrs of effort per day
                </span>
              </div>
            ) : (
              <></>
            )}
            <div className="checkout-body-price">
              <span className="checkout-body-price-number">
                $ {convertedPrice !== undefined ? convertedPrice : props.price}
              </span>
              <span className="checkout-body-price-text">price</span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CheckoutBody;
