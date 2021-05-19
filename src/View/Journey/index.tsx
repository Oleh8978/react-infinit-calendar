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
        text={'Business Fundamentals'}
        hashours={true}
      />
      <TextComponent
        data={
          'We boil down entrepreneurship to its core activities and then have you focus on those'
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
