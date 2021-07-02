import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import NavigationBar from '@app/component/NavigationBar';

// components
import JourneyHeader from '@app/view/Account/JourneyInfo/JourneyHeader';
import JourneyDescription from '@app/view/Account/JourneyInfo/JourneyDescription';
import JourneyListComponent from '@app/view/Account/JourneyInfo/JourneyListComponent';
import JourneyFixedBottom from './JourneyFixdedBottom';

import { getJourney, getJourneyLoader } from '@app/controller/journey';
import {
  deleteJourneyConnectAction,
  getJourneyDataAction,
  setJourneyConnectAction,
} from '@app/controller/journey/actions';
import { getAccessToken } from '@app/controller/auth';
import { StatisticAPI } from '@app/controller/statistic/transport/statistic.api';
import { RouteComponentProps } from 'react-router-dom';
import Loader from '@app/component/Loader';
import ConfirmationWindow from '@app/component/modalWindow/confirmationWindow';
import { JourneyGetResponse, StatisticGetJourneyResponse } from '@ternala/frasier-types';
import moment from 'moment';
import {
  deleteDayOffAction,
  setDayOffAction,
} from '@app/controller/schedule/actions';

interface IRoute {
  route?: string;
}

type IProps = RouteComponentProps<{ id: string }> & IRoute;

const Journey: React.FC<IProps> = ({ ...props }) => {
  console.log('props ', props);
  const [isStartPopup, setStartPopup] = useState<boolean>(false);
  const [isStopPopup, setStopPopup] = useState<boolean>(false);
  const [isTrialPeriod, setIsTrialPeriod] = useState<boolean>(false);
  const [isTrialPeriodStarted, setIsTrialPeriodStarted] = useState<boolean>(
    false,
  );
  const [hasHours, setHasHours] = useState<boolean>(false);
  const [statistic, setStatistic] = useState<StatisticGetJourneyResponse | undefined>();

  const journey = useSelector(getJourney);
  const tokenPromise = useSelector(getAccessToken);
  const loader = useSelector(getJourneyLoader);
  const id = Number(props.match.params.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJourneyDataAction.request(id));
    if(journey.status) {
      setIsTrialPeriodStarted(journey.status.isTrial);
    }

    tokenPromise.then((token) => {
      if (token !== undefined) {
        StatisticAPI.getStatisticByJourney(id, token).then((item) => {
          if (typeof item !== 'string') {
            setStatistic(item);
            setHasHours(item.journey.statistic.maxSpent > 0);
            setIsTrialPeriod(item.journey.trialPeriod > 0);
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    if(journey.status) {
      setIsTrialPeriodStarted(journey.status.isTrial);
    }
  }, [journey])

  //
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
    setIsTrialPeriodStarted(true);
    dispatch(
      setJourneyConnectAction.request({
        id,
      }),
    );
  };

  const stopTrial = () => {
    setStopPopup(false);
    setIsTrialPeriodStarted(false);
    setIsTrialPeriod(false);
    dispatch(
      deleteJourneyConnectAction.request({
        ids: [id],
      }),
    );
  };

  return (
    <>
      {(journey !== undefined && statistic !== undefined) ? (
        <div className={'jorneydiscoveymain'}>
          {loader.isLoading ? (<Loader isSmall={true} isAbsolute={true} />) : (<></>)}
          {isStartPopup ? (
            <ConfirmationWindow firstButton={'I Want to Hold Off'}
                                secondButton={'Good, Let’s Proceed'}
                                text={'This journey will start on'}
                                title={journey.status ? moment(journey.status.startDate).format("dddd, MMM Do") : ''}
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
            statistic={statistic}
            journey={journey}
            isTrialStarted={isTrialPeriodStarted}
            hashours={hasHours}
          />
          {/*<JourneyListComponent data={list} />*/}
          <div className='jorneydiscoveymain-bottom-wrapper'>
            <JourneyFixedBottom
              price={journey.price}
              trialPeriod={journey.trialPeriod}
              hasTrialPeriod={isTrialPeriod}
              isTrialPeriodStarted={isTrialPeriodStarted}
              trialEndDate={journey.status?.trialEndDate}
              setIsStartPopup={setIsStartPopup}
              setIsStopPopup={setIsStopPopup}
              id={id} />
          </div>
        </div>
      ) : (
        <Loader isSmall={true} isAbsolute={true} />
      )}
    </>
  );
};

export default Journey;
