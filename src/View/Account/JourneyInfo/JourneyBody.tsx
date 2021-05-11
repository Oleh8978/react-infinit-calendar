import React from 'react';

// components
import JourneyHeader from './JourneyHeader';
import JourneyDescription from './JourneyDescription';
import TextComponent from './JourneyTextComponents';
import JourneyListComponent from './JourneyListComponent';
import JourneyFooter from './JourneyFooter';

// hardcoded data
import { list } from './hardcoded/hardcodedData';

interface IProps {}

const JourneyBody: React.FC<IProps> = () => {
  return (
    <div className={'journeyinfo-body'}>
      <JourneyHeader />
      <JourneyDescription />
      <TextComponent
        data={
          'Running a business comes with considerable legal and tax responsibilities, including filing and payment deadlines.'
        }
      />
      <JourneyListComponent data={list}/>
      <JourneyFooter />
    </div>
  );
};

export default JourneyBody;
