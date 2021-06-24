import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

// components
import Link from 'Routing/Link';

// Custom components
import Profile from './ProfileMain';
import AnalisticKPI from './AnalisticKPI';
import NoDataFound from './NoDataFound';
import TodaysJourney from './TodaysJorney';
import MyJourneys from './MyJourneys';
import Notes from './Notes';
import Tips from './Tips';

interface IProps extends RouteComponentProps {}

const Account: React.FC<IProps> = () => {
  return (
    <div className={'profile-wrapper'}>
      <Profile />
      <div className="profile-body-wrapper">
        <AnalisticKPI />
        {/* <NoDataFound /> */}
        <TodaysJourney />
        {/* <Notes /> */}
        {/* <Tips /> */}
        <MyJourneys />
      </div>
    </div>
  );
};

export default Account;
