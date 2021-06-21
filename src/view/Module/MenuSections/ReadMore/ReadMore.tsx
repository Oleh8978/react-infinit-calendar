import React, { useState, useEffect } from 'react';

// components
import NavigationBar from '@app/component/NavigationBar';
import TextWrapper from './TextWrapper';
import List from '@app/view/Module/MenuSections/Overview/List';

// hardoced
import { data } from '@app/view/Module/MenuSections/staticHardcoded/data';

interface IProps {}

const ReadMore: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className="read-more-main">
      <NavigationBar rout={'module'} name={'Decide on how...'} />
      <div className="read-more-main-wrapper">
        <TextWrapper
          text={
            'Running a business comes with considerable legal and tax responsibilities, including filing and payment deadlines.'
          }
          texthighlited={''}
        />
        <TextWrapper
          text={
            'Make a list of all your bills: utilities, credit cards and your rent or mortgage payment. Include any other loan payments you have, too.'
          }
          texthighlited={''}
        />
        <div className="read-more-main-wrapper-list">
          <List items={data} isUnderlined={false} />
        </div>
      </div>
    </div>
  );
};

export default ReadMore;
