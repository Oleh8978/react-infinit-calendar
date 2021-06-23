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

// hardcoded data
import { list } from '@app/view/Account/JourneyInfo/hardcoded/hardcodedData';

import { getJourney, getJourneyLoader } from '@app/controller/journey';
import { getJourneyDataAction } from '@app/controller/journey/actions';
import { getAccessToken } from '@app/controller/auth';
import { StatisticAPI } from '@app/controller/statistic/transport/statistic.api';
import { StatisticGetJourneyResponse } from '@ternala/frasier-types';
import { RouteComponentProps } from 'react-router-dom';
import Loader from '@app/component/Loader';
import ConfirmationWindow from '@app/component/modalWindow/confirmationWindow';

type IProps = RouteComponentProps<{ id: string }>;

const Journey: React.FC<IProps> = ({...props}) => {
  const [isStartPopup, setStartPopup] = useState<boolean>(false);
  const [isStopPopup, setStopPopup] = useState<boolean>(false);

  const journey = useSelector(getJourney);
  const tokenPromise = useSelector(getAccessToken);
  const loader = useSelector(getJourneyLoader);
  const [statistic, setStatistic] = useState<StatisticGetJourneyResponse | string>('');
  const id = Number(props.match.params.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJourneyDataAction.request(id));

    // tokenPromise.then((token) => {
    //   StatisticAPI.getStatistic(id, token).then((item) => {
    //     if (typeof item !== 'string') {
    //       setStatistic(item);
    //     }
    //   });
    // });
  }, [])

  // console.log('item');
  // console.log(statistic);
  console.log('journey');
  console.log(journey);

  const setIsStartPopup = (boolean) => {
    setStartPopup(boolean);
  }

  const setIsStopPopup = (boolean) => {
    setStopPopup(boolean);
  }

  return (
    <div className={'jorneydiscoveymain'}>
      {loader.isLoading ? (<Loader isSmall={true} isAbsolute={true} />) : (<></>)}
      {isStartPopup ? (
        <ConfirmationWindow firstButton={'I Want to Hold Off'}
                            secondButton={'Good, Let’s Proceed'}
                            text={'This journey will start on'}
                            title={'Monday, Jan 27'}/>
      ) : (<></>)}
      {isStopPopup ? (
        <ConfirmationWindow firstButton={'Yes, I am Fine With That'}
                            secondButton={'No, Let’s Keep It Going'}
                            text={'All of your progress will be erased.'}
                            title={'Are you sure?'}/>
      ) : (<></>)}
      <NavigationBar name={'Journey Info'} rout={'/'} />
      <JourneyHeader img={journey.image} />
      <JourneyDescription
        text={journey.title}
        hashours={true}
        workDays={journey.workDays}
      />
      <TextComponent
        data={journey.subTitle}
      />
      {/*<JourneyListComponent data={list} />*/}
      <div className="jorneydiscoveymain-bottom-wrapper">
        <JourneyFixedBottom price={journey.price} trialPeriod={journey.trialPeriod} setIsStartPopup={setIsStartPopup} setIsStopPopup={setIsStopPopup} />
      </div>
    </div>
  );
};

export default Journey;
