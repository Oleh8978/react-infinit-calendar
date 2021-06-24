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

type IProps = RouteComponentProps<{ id: string }>;

const Journey: React.FC<IProps> = ({ ...props }) => {
  const [isStartPopup, setStartPopup] = useState<boolean>(false);
  const [isStopPopup, setStopPopup] = useState<boolean>(false);
  const [isTrialPeriod, setIsTrialPeriod] = useState<boolean>(false);
  const [isTrialPeriodStarted, setIsTrialPeriodStarted] = useState<boolean>(false);
  const [hasHours, setHasHours] = useState<boolean>(false);
  const [statistic, setStatistic] = useState<any | undefined>();

  const journey = useSelector(getJourney);
  const tokenPromise = useSelector(getAccessToken);
  const loader = useSelector(getJourneyLoader);
  const id = Number(props.match.params.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJourneyDataAction.request(id));

    tokenPromise.then((token) => {
      if (token !== undefined) {
        StatisticAPI.getStatistic(id, token).then((item) => {
          if (typeof item !== 'string') {
            setStatistic(item);
            setHasHours(item.journey.statistic.maxSpent > 0);
            setIsTrialPeriod(item.journey.trialPeriod > 0);
          }
        });
      }
    });

  }, []);

  // console.log('item');
  // console.log(statistic);
  // console.log('journey');
  // console.log(journey);

  const setIsStartPopup = (boolean) => {
    setStartPopup(boolean);
  };

  const setIsStopPopup = (boolean) => {
    setStopPopup(boolean);
  };

  const startTrial = () => {
    setStartPopup(false);
    //const newDate = new Date();
    setIsTrialPeriodStarted(true);
  };

  const stopTrial = () => {
    setStopPopup(false);
    setIsTrialPeriodStarted(false);
    setIsTrialPeriod(false);
  };

  return (
    <>
      {(journey !== undefined && statistic !== undefined) ?
      (<div className={'jorneydiscoveymain'}>
        {loader.isLoading ? (<Loader isSmall={true} isAbsolute={true} />) : (<></>)}
        {isStartPopup ? (
          <ConfirmationWindow firstButton={'I Want to Hold Off'}
                              secondButton={'Good, Let’s Proceed'}
                              text={'This journey will start on'}
                              title={'Monday, Jan 27'}
                              firstAction={() => setStartPopup(false)}
                              secondAction={startTrial}
          />
        ) : (<></>)}
        {isStopPopup ? (
          <ConfirmationWindow firstButton={'Yes, I am Fine With That'}
                              secondButton={'No, Let’s Keep It Going'}
                              text={'All of your progress will be erased.'}
                              title={'Are you sure?'}
                              firstAction={stopTrial}
                              secondAction={() => setStopPopup(false)}
          />
        ) : (<></>)}
        <NavigationBar name={'Journey Info'} rout={'/'} />
        <JourneyHeader img={journey.image} />
          <JourneyDescription
            text={journey.title}
            hashours={hasHours}
            workDays={journey.workDays}
            duration={statistic.journey.statistic.maxSpent}
            maxDaySpent={statistic.journey.statistic.maxDaySpent}
            minDaySpent={statistic.journey.statistic.minDaySpent}
          />
        <TextComponent
          data={journey.subTitle}
        />
        {/*<JourneyListComponent data={list} />*/}
        <div className='jorneydiscoveymain-bottom-wrapper'>
          <JourneyFixedBottom
            price={journey.price}
            trialPeriod={journey.trialPeriod}
            hasTrialPeriod={isTrialPeriod}
            isTrialPeriodStarted={isTrialPeriodStarted}
            setIsStartPopup={setIsStartPopup}
            setIsStopPopup={setIsStopPopup}
            id={id} />
        </div>
      </div>) : (<Loader isSmall={true} isAbsolute={true} />)
      }
    </>
  )
}

export default Journey;
