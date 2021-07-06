import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

// components
import NavigationBar from '@app/component/NavigationBar';
import CheckoutPayment from '@app/component/CheckoutPaymentButton';
import CheckoutBody from '@app/view/Journey/CheckoutBody';
import { StatisticAPI } from '@app/controller/statistic/transport/statistic.api';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '@app/controller/auth';
import Loader from '@app/component/Loader';
import { buyJourneyAction, setJourneyConnectAction } from '@app/controller/journey/actions';
import { PaymentAPI } from '@app/controller/payment/transport/payment.api';

type IProps = RouteComponentProps<{
  paymentId: string;
  id: string }>;

const Checkout: React.FC<IProps> = ({ ...props }) => {
  const [statistic, setStatistic] = useState<any | undefined>();
  const tokenPromise = useSelector(getAccessToken);
  const id = props.match.params.id;
  const paymentId = props.match.params.paymentId;
  const dispatch = useDispatch();

  useEffect(() => {
    if(id) {
      tokenPromise.then((token) => {
        if (token !== undefined) {
          StatisticAPI.getStatisticByJourney(Number(id), token).then((item) => {
            if (typeof item !== 'string') {
              setStatistic(item);
            }
          });
        }
      });
    } else {
      tokenPromise.then((token) => {
        if (token !== undefined) {
          PaymentAPI.getPaymentInfo(paymentId, token).then((item) => {
            console.log('paymentinfo')
            console.log(item)
            // if (typeof item !== 'string') {
            //   setStatistic(item);
            // }
          });
        }
      });
    }

  }, []);

  const redirectToPayPal = () => {
    dispatch(
      buyJourneyAction.request({
        journey: Number(id),
      }),
    );
  }

  return (
    <>
      {statistic !== undefined ?
        <div className={'checkout'}>
          <NavigationBar name={'Checkout'} rout={`/journey/${id}`} />
          <CheckoutBody
            title={statistic.journey.title}
            img={statistic.journey.image}
            duration={statistic.journey.statistic.maxSpent}
            maxDaySpent={statistic.journey.statistic.maxDaySpent}
            minDaySpent={statistic.journey.statistic.minDaySpent}
            price={statistic.journey.price} />
          <div className='checkout-bottom-wrapper'>
            <CheckoutPayment redirectToPayPal={redirectToPayPal} />
          </div>
        </div> : <Loader isSmall={true} isAbsolute={true} />
      }
    </>
  );
};

export default Checkout;
