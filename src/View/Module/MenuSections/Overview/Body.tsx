import React from 'react';

// components
import { SectionContent } from '../../../../Component/SectionContent';

import { ModuleExpandDTO } from '../../../../Controller/module/models';

interface IProps {
  module: ModuleExpandDTO;
}

const Body: React.FC<IProps> = ({ module }) => {
  return (
    <>
      <div className="overview-body">
        {module?.sections?.sort((el1, el2) => {
            if (el1.orderNumber < el2.orderNumber) return -1;
            if (el1.orderNumber > el2.orderNumber) return 1;
            return 0;
          })
          .map((section) => (
            <SectionContent section={section} key={section.id} />
          ))}

        {/*<Slider people={experts} isMain={true}/>*/}
      </div>
    </>
  );
};

export default Body;
