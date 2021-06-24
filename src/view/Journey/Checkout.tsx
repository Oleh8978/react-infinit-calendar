import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import NavigationBar from '@app/component/NavigationBar';

// components
import JourneyHeader from '@app/view/Account/JourneyInfo/JourneyHeader';
import JourneyDescription from '@app/view/Account/JourneyInfo/JourneyDescription';
import TextComponent from '@app/view/Account/JourneyInfo/JourneyTextComponents';
import JourneyListComponent from '@app/view/Account/JourneyInfo/JourneyListComponent';
import JourneyFixedBottom from './JourneyFixdedBottom';


import { getJourney, getJourneyLoader } from '@app/controller/journey';
import { getJourneyDataAction } from '@app/controller/journey/actions';
import { getAccessToken } from '@app/controller/auth';
import { StatisticAPI } from '@app/controller/statistic/transport/statistic.api';
import { RouteComponentProps } from 'react-router-dom';
import Loader from '@app/component/Loader';
import ConfirmationWindow from '@app/component/modalWindow/confirmationWindow';
import moment from 'moment';
import CheckoutPayment from '@app/component/CheckoutPaymentButton';
import CheckoutBody from '@app/view/Journey/CheckoutBody';

type IProps = RouteComponentProps<{ id: string }>;

const Checkout: React.FC<IProps> = ({...props}) => {
  return (
    <div className={'checkout'}>
      {/*{loader.isLoading ? (<Loader isSmall={true} isAbsolute={true} />) : (<></>)}*/}
      <NavigationBar name={'Checkout'} rout={'/'} />
      <CheckoutBody
        title={'Marketing Analytics: Price and Promotion Analytics'}
        img={''}
        duration={620}
        maxDaySpent={140}
        minDaySpent={10}
        price={100}/>
      <div className="jorneydiscoveymain-bottom-wrapper">
        <CheckoutPayment />
      </div>
    </div>
  );
};

export default Checkout;
