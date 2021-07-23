import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

// components
import NavigationBar from '@app/component/NavigationBar';
import CheckoutPayment from '@app/component/CheckoutPaymentButton';
import CheckoutBody from '@app/view/Journey/CheckoutBody';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '@app/controller/auth';
import { buyJourneyAction, getJourneyDataAction, setJourneyConnectAction } from '@app/controller/journey/actions';
import { PaymentAPI } from '@app/controller/payment/transport/payment.api';
import { PaymentGetResponse } from '@ternala/frasier-types';
import PaymentFailed from '@app/view/Journey/PaymentFailed';
import { getLoader, getStatisticByJourney } from '@app/controller/statisticJourney';
import { getJourneyStatisticAction } from '@app/controller/statisticJourney/actions';
import { getJourney } from '@app/controller/journey';
import PaymentSuccessful from '@app/view/Journey/PaymentSuccessful';
import { LoaderAction } from '@app/config/constants';
import Loader from '@app/component/Loader';

type IProps = RouteComponentProps<{
  paymentId: string;
  id: string
}>;

const Checkout: React.FC<IProps> = ({ ...props }) => {
  const journey = useSelector(getJourney);
  const statistic = useSelector(getStatisticByJourney);
  const loader = useSelector(getLoader);
  const [paymentInfo, setPaymentInfo] = useState<PaymentGetResponse>(undefined);
  const tokenPromise = useSelector(getAccessToken);
  const id = Number(props.match.params.id);
  const paymentId = props.match.params.paymentId;
  const dispatch = useDispatch();

  useEffect(() => {
    if (id && !paymentId) {
      dispatch(getJourneyDataAction.request(id));
      dispatch(getJourneyStatisticAction.request({ id }));

    } else if (paymentId) {
      tokenPromise.then((token) => {
        if (token !== undefined) {
          PaymentAPI.getPaymentInfo(paymentId, token).then((item) => {

            if (typeof item !== 'string') {
              setPaymentInfo(item);
            }
          });
        }
      });
      dispatch(getJourneyStatisticAction.request({ id: paymentInfo?.journey.id }));
    }

  }, []);


  const redirectToPayPal = () => {
    dispatch(
      buyJourneyAction.request({
        journey: id ? id : paymentInfo.journey.id,
      }),
    );
  };

  return (
    <>
      {Boolean(loader.filter((item) => item.type === LoaderAction.statistic.getStatisticByJourney)
        .length) && (
        <Loader isSmall={true} isAbsolute={true} />
      )}

      {paymentInfo !== undefined ? (
          paymentInfo.status ? (
            <>
              <PaymentSuccessful rout={`/journey/${paymentInfo.journey.id}`} />
              <CheckoutBody
                title={paymentInfo.journey.title}
                img={paymentInfo.journey.image}
                duration={statistic[paymentInfo.journey.id]?.statistic.maxSpent}
                maxDaySpent={statistic[paymentInfo.journey.id]?.statistic.maxDaySpent}
                minDaySpent={statistic[paymentInfo.journey.id]?.statistic.minDaySpent}
                price={paymentInfo.journey.price}/>
            </>
          ) : (
            <PaymentFailed redirectToPayPal={redirectToPayPal} rout={`/journey/${paymentInfo.journey.id}`} />
          )

        ) :
        <div className={'checkout'}>
          <NavigationBar name={'Checkout'} rout={`/journey/${id}`} />
          <CheckoutBody
            title={journey?.title}
            img={journey?.image}
            duration={statistic[id]?.statistic.maxSpent}
            maxDaySpent={statistic[id]?.statistic.maxDaySpent}
            minDaySpent={statistic[id]?.statistic.minDaySpent}
            price={journey?.price} />
          <div className='checkout-bottom-wrapper'>
            <CheckoutPayment redirectToPayPal={redirectToPayPal} />
          </div>
        </div>
      }
    </>
  );
};

export default Checkout;
