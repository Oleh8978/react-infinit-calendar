import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import NavigationBar from '@app/component/NavigationBar';

// components
import JourneyHeader from '@app/view/Account/JourneyInfo/JourneyHeader';
import JourneyDescription from '@app/view/Account/JourneyInfo/JourneyDescription';
import JourneyFixedBottom from './JourneyFixdedBottom';

import { getJourney, getJourneyLoader } from '@app/controller/journey';
import {
  deleteJourneyConnectAction,
  getJourneyDataAction,
  setJourneyConnectAction,
} from '@app/controller/journey/actions';
import { RouteComponentProps } from 'react-router-dom';
import Loader from '@app/component/Loader';
import ConfirmationWindow from '@app/component/modalWindow/confirmationWindow';
import moment from 'moment';
import { getStatisticByJourney } from '@app/controller/statisticJourney';
import { getJourneyStatisticAction } from '@app/controller/statisticJourney/actions';
import { IStatisticState } from '@app/controller/statisticJourney/models';

interface IRoute {
  route?: string;
}

type IProps = RouteComponentProps<{ id: string }> & IRoute;

const Journey: React.FC<IProps> = ({ ...props }) => {
  const [isStartPopup, setStartPopup] = useState<boolean>(false);
  const [isStopPopup, setStopPopup] = useState<boolean>(false);
  const [isTrialPeriod, setIsTrialPeriod] = useState<boolean>(false);
  const [isTrialPeriodStarted, setIsTrialPeriodStarted] = useState<boolean>(
    false,
  );
  const [hasHours, setHasHours] = useState<boolean>()
  //const [statistic, setStatistic] = useState<IStatisticState>()

  const journey = useSelector(getJourney);
  const statistic = useSelector(getStatisticByJourney);
  const loader = useSelector(getJourneyLoader);
  const id = Number(props.match.params.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJourneyDataAction.request(id));
    dispatch(getJourneyStatisticAction.request({ id }));

    //setStatistic(statistics[id]);
    if (journey.status) {
      setIsTrialPeriodStarted(journey.status.isTrial);
    }

    setIsTrialPeriod(journey.trialPeriod > 0);
  }, []);

  // useEffect(() => {
  //   setHasHours(statistic[id]?.statistic?.maxSpent > 0)
  // }, [statistic]);

  useEffect(() => {
    if (journey.status) {
      setIsTrialPeriod(journey.trialPeriod > 0);
      setIsTrialPeriodStarted(journey.status.isTrial);
    }
  }, [journey]);


  // useEffect(() => {
  //  // if(isTrialPeriodStarted) {
  //     if (statistic !== undefined) {
  //       setHasHours(statistic.journey.statistic.maxSpent > 0);
  //       setIsTrialPeriod(journey.trialPeriod > 0);
  //     }
  //  // }
  // }, [statistic]);

  console.log('item');
  console.log(statistic);
  console.log('journey');
  console.log(journey);

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
      {(journey !== undefined) ?
        (<div className={'jorneydiscoveymain'}>
            {loader.isLoading ? (<Loader isSmall={true} isAbsolute={true} />) : (<></>)}
            {isStartPopup ? (
              <ConfirmationWindow firstButton={'I Want to Hold Off'}
                                  secondButton={'Good, Let’s Proceed'}
                                  text={'This journey will start on'}
                                  title={journey.status ? moment(journey.status.startDate).format('dddd, MMM Do') : ''}
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
              id={id}
              hasHours={hasHours}/>
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
