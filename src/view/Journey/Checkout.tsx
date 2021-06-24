import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';


// components
import NavigationBar from '@app/component/NavigationBar';
import CheckoutPayment from '@app/component/CheckoutPaymentButton';
import CheckoutBody from '@app/view/Journey/CheckoutBody';
import { getJourneyDataAction } from '@app/controller/journey/actions';
import { StatisticAPI } from '@app/controller/statistic/transport/statistic.api';
import { useSelector } from 'react-redux';
import { getAccessToken } from '@app/controller/auth';
import Loader from '@app/component/Loader';

type IProps = RouteComponentProps<{ id: string }>;

const Checkout: React.FC<IProps> = ({ ...props }) => {
  const [statistic, setStatistic] = useState<any | undefined>();
  const tokenPromise = useSelector(getAccessToken);
  const id = Number(props.match.params.id);

  useEffect(() => {
    tokenPromise.then((token) => {
      if (token !== undefined) {
        StatisticAPI.getStatistic(id, token).then((item) => {
          if (typeof item !== 'string') {
            setStatistic(item);
          }
        });
      }
    });

  }, []);

  console.log('statistic');
  console.log(statistic);

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
            <CheckoutPayment />
          </div>
        </div> : <Loader isSmall={true} isAbsolute={true} />
      }
    </>
  );
};

export default Checkout;
