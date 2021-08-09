import React from 'react';

// components
import JorneyComponent from './JorneyComponent/JorneyComponent';
import CompletedJourneys from './Completed/CompletedJourneys';
import Loader from '@app/component/Loader';

const MyJourneys: React.FC<any> = ({ ...props }) => {
  const listData = props.listData;
  return (
    <div className={'profile-myjourneys'}>
      {listData && listData.length !== 0 && (
        <span className={'profile-myjourneys-header'}>My journeys </span>
      )}
      {listData === undefined ? (
        <Loader />
      ) : (
        <>
          <div className={'profile-myjourneys-wrapper'}>
            {listData &&
              listData
                .filter((item) => item.statistic.isCompleted === false)
                .map((item) => {
                  return <JorneyComponent data={item} />;
                })}
          </div>
          {listData &&
          listData.filter((item) => item.statistic.isCompleted === true)
            .length > 0 ? (
            <CompletedJourneys
              listData={listData.filter(
                (item) => item.statistic.isCompleted === true,
              )}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default MyJourneys;
