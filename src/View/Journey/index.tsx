import React, { useEffect, useState } from 'react';

// components
import NavigationBar from 'Component/NavigationBar';

// components
import JourneyHeader from 'View/Account/JourneyInfo/JourneyHeader';
import JourneyDescription from 'View/Account/JourneyInfo/JourneyDescription';
import TextComponent from 'View/Account/JourneyInfo/JourneyTextComponents';
import JourneyListComponent from 'View/Account/JourneyInfo/JourneyListComponent';
import JourneyFixedBottom from './JourneyFixdedBottom';

// hardcoded data
import { list } from 'View/Account/JourneyInfo/hardcoded/hardcodedData';

interface IProps {}

const Journey: React.FC<IProps> = () => {
  return (
    <div className={'jorneydiscoveymain'}>
      <NavigationBar name={'Journey Info'} rout={'/'} />
      <JourneyHeader />
      <JourneyDescription
        text={'Marketing Analytics: Price and Promotion Analytics'}
        hashours={true}
      />
      <TextComponent
        data={
          'Running a business comes with considerable legal and tax responsibilities, including filing and payment deadlines.'
        }
      />
      <JourneyListComponent data={list} />
      <div className="jorneydiscoveymain-bottom-wrapper">
        <JourneyFixedBottom />
      </div>
    </div>
  );
};

export default Journey;
