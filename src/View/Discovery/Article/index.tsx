import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

// components
import NavigationBar from 'Component/NavigationBar';
import TipsComponent from 'View/Module/MenuSections/Overview/Tips';
import List from 'View/Module/MenuSections/Overview/List';
import Description from 'View/Module/MenuSections/Overview/Description';
import VideoComponent from 'View/Module/MenuSections/Overview/Video';
import TextComponent from 'View/Module/MenuSections/Overview/TextComponent';
import AnswerNotFound from 'View/Discovery/AnswerNotFound/AnswerNotFound';

// static
import img from './static/main.png';
import talks from 'View/Module/MenuSections/staticHardcoded/talks.png';

// hardcoded
import {
  data,
  underlinedData,
  experts,
} from 'View/Module/MenuSections/staticHardcoded/data';

interface IProps {}

const Article: React.FC<IProps> = () => {
  return (
    <div className={'jorneydiscovey'}>
      <NavigationBar name={'Podcast'} rout={'/'} />
      <div className={'jorneydiscovey-header'}>
        <span className={'jorneydiscovey-header-txt'}>
          Thinking About Plans for the Week
        </span>
        <div className={'jorneydiscovey-header-btn'}>
          <span className={'jorneydiscovey-header-btn-txt'}>Podcasts</span>
        </div>
        <div className="jorneydiscovey-header-headerimgwrapper">
          <img src={img} className="jorneydiscovey-header-img" alt="img" />
        </div>
      </div>
      <div className={'jorneydiscovey-body'}>
        <Description />
        <List underlinedItems={underlinedData} isUnderlined={true} />
        <VideoComponent
          link={
            'https://www.youtube.com/embed/3J7HG6IuV_c?list=PLvVNnY_Ve0XRRlyMi_ns5_l6ChmzhWXvC'
          }
          img={talks}
        />
        <List items={data} isUnderlined={false} />
        <TipsComponent
          text={
            'This will help you keep track of them and can serve as a checklist each month to be sure you don’t miss any payments. '
          }
        />
        <TextComponent
          text={
            'Running a business comes with considerable legal and tax responsibilities, including filing and payment deadlines.'
          }
        />
        <AnswerNotFound />
      </div>
    </div>
  );
};

export default Article;
