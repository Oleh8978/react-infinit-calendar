import React, { useState } from 'react';

// components
import Description from './Description';
import AdditionalLink from './AdditionalLink';
import TextComponent from './TextComponent';
import List from './List';
import VideoComponent from './Video';
import TipsComponent from './Tips';
import HelpSection from './HelpSection/HelpSection';
import Slider from './HelpSection/Slider';

// static
import talks from 'View/Module/MenuSections/staticHardcoded/talks.png';
// hardcoded
import docs from 'View/Module/MenuSections/staticHardcoded/docs.png';
import drive from 'View/Module/MenuSections/staticHardcoded/drive.png';
import link from 'View/Module/MenuSections/staticHardcoded/link.png';
import {
  data,
  underlinedData,
  experts,
} from 'View/Module/MenuSections/staticHardcoded/data';
import { ModuleExpandDTO } from '../../../../Controller/module/models';

interface IProps {
  module: ModuleExpandDTO
}

const Body: React.FC<IProps> = ({ module }) => {
  return (
    <>
      <div className="overview-body">
        {module.sections}
        <img src={talks} className="overview-body-img__main" alt="img" />
        <Description />
        <List items={data} isUnderlined={false} />
        <VideoComponent
          link={
            'https://www.youtube.com/embed/3J7HG6IuV_c?list=PLvVNnY_Ve0XRRlyMi_ns5_l6ChmzhWXvC'
          }
          img={talks}
        />
        <AdditionalLink
          img={docs}
          isCodeExist={false}
          header={'Requirement for Blanks'}
          link ='https://docs.google.com/document/d/1VvN39ZY3Llqtc2XXP5-w_yFVl94x5qQt/edit'
        />
        <AdditionalLink
          img={link}
          isCodeExist={true}
          header={'Use our discount code for Asana to manage your workplace.'}
          campCode={'DS45671'}
          textDiscount={' some text'}
        />
        <TextComponent
          text={
            'This will help you keep track of them and can serve as a checklist each month to be sure you don’t miss any payments. '
          }
        />
        <AdditionalLink
          img={drive}
          isCodeExist={false}
          header={'All Blanks'}
          text={'Use this for your monthly report'}
        />
        <List underlinedItems={underlinedData} isUnderlined={true} />
        <TipsComponent
          text={
            'This will help you keep track of them and can serve as a checklist each month to be sure you don’t miss any payments. '
          }
        />
        <TextComponent
          text={
            'This will help you keep track of them and can serve as a checklist each month to be sure you don’t miss any payments. '
          }
        />
        <HelpSection
          header={'Do you need any help with ACCOUNTING?'}
          description={
            'Book a consultation with one of our lead accounting experts'
          }
        />
        <Slider people={experts} isMain={true}/>
      </div>
    </>
  );
};

export default Body;
