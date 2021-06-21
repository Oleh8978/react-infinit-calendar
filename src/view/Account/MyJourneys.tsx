import React, { useState, useEffect } from 'react';

// components
import JorneyComponent from './JorneyComponent/JorneyComponent';
import CompletedJourneys from './Completed/CompletedJourneys';

// hardcoded data
import { dataModules } from './hardcodedData/data';

// interfaces
import { IModule } from './Models';

interface IProps {}

const MyJourneys: React.FC<IProps> = () => {
  const [data, setData] = useState<IModule[]>(dataModules);
  return (
    <div className={'profile-myjourneys'}>
      <span className={'profile-myjourneys-header'}>My journeys </span>
      <div className={'profile-myjourneys-wrapper'}>
        {data.map((item) => {
          return <JorneyComponent data={item} />;
        })}
      </div>
      <CompletedJourneys />
    </div>
  );
};

export default MyJourneys;
