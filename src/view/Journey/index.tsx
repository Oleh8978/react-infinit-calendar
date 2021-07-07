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

  const journey = useSelector(getJourney);
  const statistic = useSelector(getStatisticByJourney);
  const journeyLoader = useSelector(getJourneyLoader);
  const id = Number(props.match.params.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJourneyDataAction.request(id));
    dispatch(getJourneyStatisticAction.request({ id }));

    if (journey.status) {
      setIsTrialPeriodStarted(journey.status.isTrial);
    }

    setIsTrialPeriod(journey.trialPeriod > 0);
  }, []);

  useEffect(() => {
    if (journey.status) {
      setIsTrialPeriod(journey.trialPeriod > 0);
      setIsTrialPeriodStarted(journey.status.isTrial);
    }
  }, [journey]);

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

  const setStartConnection = () => {
    dispatch(
      setJourneyConnectAction.request({
        id,
      }),
    );
  };

  const setStopConnection = () => {
    setStopPopup(false);
    dispatch(
      deleteJourneyConnectAction.request({
        ids: [id],
      }),
    );
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
            {journeyLoader.isLoading ? (<Loader isSmall={true} isAbsolute={true} />) : (<></>)}
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
                                  firstAction={journey?.status?.isTrial ? stopTrial : setStopConnection}
                                  secondAction={() => setStopPopup(false)}
              />
            ) : (<></>)}
            <NavigationBar name={'Journey Info'} rout={'/'} />
            <JourneyHeader img={journey.image} />
            <JourneyDescription
              statistic={statistic}
              journey={journey}
              isTrialStarted={isTrialPeriodStarted}
              id={id}/>
            {/*<JourneyListComponent data={list} />*/}
            <div className='jorneydiscoveymain-bottom-wrapper'>
              <JourneyFixedBottom
                price={journey.price}
                trialPeriod={journey.trialPeriod}
                hasTrialPeriod={journey?.status?.isTrial && journey?.status?.isConnected}
                isTrialPeriodStarted={isTrialPeriodStarted}
                trialEndDate={journey.status?.trialEndDate}
                isPaid={journey?.status?.isConnected && !journey?.status?.isTrial}
                isConnected={journey?.status?.isConnected}
                setIsStartPopup={setIsStartPopup}
                setIsStopPopup={setIsStopPopup}
                setStartConnection={setStartConnection}
                setStopConnection={setStopConnection}
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
