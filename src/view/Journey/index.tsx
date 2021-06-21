import React, { useEffect, useState } from 'react';

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
