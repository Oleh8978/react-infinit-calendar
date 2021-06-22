import React, { useState } from 'react';
import AnswerNotFound from '../../../Discovery/AnswerNotFound/AnswerNotFound';
import HelpSection from '../Overview/HelpSection/HelpSection';
import Slider from '../Overview/HelpSection/Slider';
import Questions from './Questions';
import { experts } from '../staticHardcoded/data';

interface IProps {}

const Help: React.FC<IProps> = () => {
  return (
    <div className={'help'}>
      <HelpSection
        header={'Do you need any help with ACCOUNTING?'}
        description={
          'Book a consultation with one of our lead accounting experts'
        }
      />
      <Slider people={experts} isMain={true} />

      <Questions text={'Frequently Asked Questions'} />

      <AnswerNotFound />
    </div>
  );
};

export default Help;
