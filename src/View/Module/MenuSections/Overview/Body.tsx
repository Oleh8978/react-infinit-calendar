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

interface IProps {}

const Body: React.FC<IProps> = () => {
  return (
    <>
      <div className="overview-body">
        <img src={talks} className="overview-body-img__main" alt="img" />
        <Description />
        <List items={data} isUnderlined={false} />
        <VideoComponent
          link={
            'https://www.youtube.com/embed/MkD7OZZKeiM'
          }
          img={talks}
        />
        <AdditionalLink
          img={docs}
          isCodeExist={false}
          header={'Requirement for Blanks'}
        />
        <AdditionalLink
          img={link}
          isCodeExist={true}
          header={'Here Is a Link to Some Tool With a Referral Discount Code'}
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
        <Slider people={experts} />
      </div>
    </>
  );
};

export default Body;
