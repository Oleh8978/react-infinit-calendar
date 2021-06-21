import React, { useEffect, useState } from 'react';

// components
import Header from './Header';
import Body from "./Body";
import Tasks from '../Tasks/Tasks';
import { useSelector } from 'react-redux';
import { getModules } from '@app/controller/module';
import { ModuleExpandDTO } from '@app/controller/module/models';

interface IProps {
  id: number;
}

const Overview: React.FC<IProps> = ({ id }) => {
  const [module, setModule] = useState<ModuleExpandDTO>();
  const modules = useSelector(getModules);

  useEffect(() => {
    setModule(modules[id]);
  }, [modules]);
  return (
    <div className={'overview'}>
      <Header module={module}/>
      <Body module={module}/>
    </div>
  );
};

export default Overview;
