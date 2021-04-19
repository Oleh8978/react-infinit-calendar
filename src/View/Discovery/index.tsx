import React from 'react';

import { RouteComponentProps } from 'react-router-dom';
// components
import Menu from './Menu';
import DiscoveryTopicList from './List/TopicsList'

interface IProps extends RouteComponentProps {}

const Discovery: React.FC<IProps> = () => {
  return (
    <div className={'discovery'}>
      <Menu />
      <DiscoveryTopicList />
    </div>
  );
};

export default Discovery;
