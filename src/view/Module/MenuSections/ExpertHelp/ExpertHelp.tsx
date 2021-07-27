import React, { useState, useEffect } from 'react';

// components
import NaviagtionBar from '@app/component/NavigationBar';
import Slider from '@app/view/Module/MenuSections/Overview/HelpSection/Slider';
import ContactList from './ContactListWrapper';

// fake data
import { data } from './fakeData';
import { experts } from '@app/view/Module/MenuSections/staticHardcoded/data';

interface IProps {}

const ExpertHelp: React.FC<IProps> = () => {
  return (
    <div className={'expert-help'}>
      <NaviagtionBar rout="module" name={'Expert help'} />
      <div className="expert-help-main">
        <Slider people={experts} isMain={false} marginBottom={true} />
        <div className="expert-help-main-body">
          <div className="expert-help-main-body-header">
            <span className="expert-help-main-body-header-text__top">
              Acountan
            </span>
            <span className="expert-help-main-body-header-text__bottom">
              Name name
            </span>
          </div>
          {/* <ContactList data={data} /> */}
        </div>
      </div>
    </div>
  );
};

export default ExpertHelp;
