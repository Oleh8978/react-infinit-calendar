import React, { useState, useEffect } from 'react';

// custom components
import PinkCustomButton from '@app/component/ButtonPink';

// static
import chill from './static/chill.png';

interface IProps {}

const NoDataFound: React.FC<IProps> = () => {
  return (
    <div className={'nodata-found'}>
      <h1 className={'nodata-header'}>hmm, no data available</h1>
      <span className={'nodata-text'}>
        Here you will be able to see your progress. Please start a journey in
        order to be able to track your productivity.
      </span>
      <PinkCustomButton
        marginTop={'30px'}
        marginLeft={'15px'}
        marginRight={'auto'}
        marginBottom={'auto'}
        text={'Find the Journey'}
        eventHandler={() => console.log('hi')}
      />
      <img src={chill} className={'nodata-img'} alt="img" />

    </div>
  );
};

export default NoDataFound;
