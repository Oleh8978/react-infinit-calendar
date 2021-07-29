import React, { useState } from 'react';

// static
import task from '@app/view/Account/static/tasks.svg';

// interfaces
import { ModuleExpandDTO } from '@app/controller/module/models';
import WavePercentage from '@app/component/WavePercentage';

interface IProps {
  module: ModuleExpandDTO;
}

const Header: React.FC<IProps> = ({ module }) => {
  return (
    <>
      <div className="overview-header">
        <WavePercentage bubbleValue={'T'} neededPercent={50} isGreen={true} />
        <div className="overview-header-text">
          <span className="overview-header-text__top">
            {module?.moduleCategories?.map((category) => category.title)}
          </span>
          <span className="overview-header-text__bottom">{module?.title}</span>
        </div>
      </div>
    </>
  );
};

export default Header;
