import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

// components
import Loader from '@app/component/Loader';

// Custom components
import Profile from './ProfileMain';
import AnalisticKPI from './AnalisticKPI';
import NoDataFound from './NoDataFound';
import TodaysJourney from './TodaysJorney';
import MyJourneys from './MyJourneys';
import Notes from './Notes';
import Tips from './Tips';

// Actions
import { getStatisticList } from '@app/controller/statisticList/actions';
import { getStatisticToday } from '@app/controller/statistic/actions';
import {
  getTipsListRequest,
  setReadedItems,
} from '@app/controller/Tips/actions';

import { IStore } from '@app/controller/model';

type IProps = RouteComponentProps;

const CustomReRenderHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStatisticList.request({}));
    dispatch(getStatisticToday.request({}));
  }, []);
};

const Account: React.FC<any> = ({ ...props }) => {
  const dispatch = useDispatch();
  CustomReRenderHook();

  useEffect(() => {
    if (props.listStatistic === undefined) {
      dispatch(getStatisticList.request({}));
    }
    if (props.statisticToday.today === undefined) {
      dispatch(getStatisticToday.request({}));
    }

    dispatch(
      getTipsListRequest.success({
        searchParams: null,
        response: {
          counts: undefined,
          items: [],
          countNew: undefined,
        }
      }),
    );

  }, [props.statisticToday.today, props.listStatistic]);
  const bodySetter = () => {
    if (
      props.statisticToday.today.spent === 0 &&
      props.statisticToday.today.completedTaskCount === 0 &&
      props.listStatistic.length === 0
    ) {
      return <NoDataFound />;
    }

    return (
      <>
        <AnalisticKPI />
        <TodaysJourney data={props.statisticToday} />
        <Notes />
        <Tips />
        <MyJourneys listData={props.listStatistic} />
      </>
    );
  };
  return (
    <>
      {props.loaderStatisticList === false &&
      props.loaderToday === false &&
      props.statisticToday.today !== undefined &&
      props.listStatistic !== undefined ? (
        <div className={'profile-wrapper'}>
          <Profile />
          <div className="profile-body-wrapper">
            <>{bodySetter()}</>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

// export default Account;
export default connect(
  (state: IStore) => ({
    // list of spent / current journeys
    listStatistic: state.statisticListReducer.journeyObject.journeys,
    loaderStatisticList: state.statisticListReducer.loaderState.status,
    // today Statistic
    statisticToday: state.statisticReducer.statisticToday,
    loaderToday: state.statisticListReducer.loaderState.status,
    // tips
    counts: state.tipsListReducer.tips.itemsCount,
    loader: state.tipsListReducer.loaderState.status,
    // notes
    countNotes: state.notesListReducer.state.counts,
    //user id
    userID: state.authState.user.id,
  }),
  { getStatisticList, getStatisticToday, getTipsListRequest, },
)(Account);
