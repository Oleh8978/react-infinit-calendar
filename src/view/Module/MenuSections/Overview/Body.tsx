import React from 'react';

import { ModuleExpandDTO } from '@app/controller/module/models';
import { generateContent } from '../../../Discovery/Article';

interface IProps {
  module: ModuleExpandDTO;
}

const Body: React.FC<IProps> = ({ module }) => {
  return (
    <>
      <div className="overview-body">
        {module?.sections
          ?.sort((el1, el2) => {
            if (el1.orderNumber < el2.orderNumber) return -1;
            if (el1.orderNumber > el2.orderNumber) return 1;
            return 0;
          })
          .map((section) => generateContent(section))}

        {/*<Slider people={experts} isMain={true}/>*/}
      </div>
    </>
  );
};

export default Body;
