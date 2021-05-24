import React, { useState, useEffect } from 'react';

import { RouteComponentProps } from 'react-router-dom';
// components
import Menu from './TopicMenu';
import DiscoveryTopicList from './List/TopicsList';
import SearchBar from '../../Component/SearchBar/SearchBar';

interface IProps extends RouteComponentProps {}

const Discovery: React.FC<IProps> = () => {
  const [margin, setMargin] = useState<number>(20);

  const marginAdder = (isSmall: boolean): void => {
    if (isSmall) {
      setMargin(400);
    } else {
      setMargin(20);
    }
  };
  return (
    <>
      <SearchBar />
      <div className={'discovery'}>
        <Menu marginAdder={marginAdder} />
        <DiscoveryTopicList margin={margin} />
      </div>
    </>
  );
};

export default Discovery;
