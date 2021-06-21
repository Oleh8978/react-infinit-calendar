import React, { useState } from 'react';

// static
import task from 'view/Account/static/tasks.svg';

// interfaces
import { ModuleExpandDTO } from '../../../../controller/module/models';

interface IProps {
  module: ModuleExpandDTO;
}

const Header: React.FC<IProps> = ({ module }) => {
  return (
    <>
      <div className="overview-header">
        <img className="overview-header-img" src={task} alt="img" />
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
