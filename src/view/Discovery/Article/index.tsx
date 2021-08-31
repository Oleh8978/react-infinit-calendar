import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ArticleDTO } from '@ternala/frasier-types';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';

// components
import NavigationBar from '@app/component/NavigationBar';
import TipsComponent from '@app/view/Module/MenuSections/Overview/Tips';
import List from '@app/view/Module/MenuSections/Overview/List';
import Description from '@app/view/Module/MenuSections/Overview/Description';
import VideoComponent from '@app/view/Module/MenuSections/Overview/Video';
import TextComponent from '@app/view/Module/MenuSections/Overview/TextComponent';
import AnswerNotFound from '@app/view/Discovery/AnswerNotFound/AnswerNotFound';
import Loader from '@app/component/Loader';
import NotFound from '../../Static/NotFound';
import AdditionalLink from '../../Module/MenuSections/Overview/AdditionalLink';

// static
import img from './static/main.png';

import link from '@app/view/Module/MenuSections/staticHardcoded/link.png';

// Transport
import { ArticleAPI } from '@app/controller/articles/transport/article.api';
import { getAccessToken } from '@app/controller/auth';
import EmbeddedIframe from '../../Module/MenuSections/Overview/EmbeddedIframe';
import Slider from '../../Module/MenuSections/Overview/HelpSection/Slider';

type IProps = RouteComponentProps<{ id: string }>;

export const generateContent = (section) => {
  switch (section.type) {
    case 'text':
      console.log(section.content);
      console.log(parse(`${section.content}`));

      return section.content ? (
        <div className="overview-text" key={section.id}>
          {section.content ? parse(`${section.content}`) : ''}
        </div>
      ) : (
        ''
      );
      break;
    case 'image':
      return (
        <div className="jorneydiscovey-header-headerimgwrapper">
          <img
            key={section.id}
            src={section.url}
            title={section.title}
            className="jorneydiscovey-header-img"
            alt="img"
          />
        </div>
      );
      break;
    case 'iframe_popup':
      return (
        <VideoComponent
          content={parse(`${section.content}`)}
          img={section.url}
          key={section.id}
        />
      );
      break;
    case 'embedded_iframe':
      return (
        <EmbeddedIframe
          content={parse(`${section.content}`)}
          key={section.id}
        />
      );
      break;
    case 'link_section':
      return (
        <AdditionalLink
          img={link}
          isCodeExist={false}
          header={section.title}
          link={section.url}
          text={section.content ? parse(`${section.content}`) : ''}
        />
      );
      break;
    case 'showcase_widget':
      return (
        <Slider
          isMain={false}
          people={section.content || []}
          key={section.id}
        />
      );
      break;
    default:
      return section.content ? (
        <div className="overview-text" key={section.id}>
          {section.content ? parse(`${section.content}`) : ''}
        </div>
      ) : (
        ''
      );
  }
};

const Article: React.FC<IProps> = (props) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [article, setArticle] = useState<any | undefined>();
  const id = Number(props.match.params.id);

  if (isNaN(id))
    return (
      <NotFound
        history={props.history}
        location={props.location}
        match={props.match}
      />
    );

  const tokenPromise = useSelector(getAccessToken);

  useEffect(() => {
    setLoading(true);

    tokenPromise.then((token) => {
      ArticleAPI.getArticle(id, token).then((article) => {
        console.log(article);
        if (typeof article !== 'string') {
          setArticle(article);
          setLoading(false);
        }
      });
    });
  }, []);

  if (isLoading) return <Loader />;

  const myData = [].concat(article.sections);

  return (
    <div className={'jorneydiscovey'}>
      <NavigationBar
        name={article.categories.map((category) => category.title).join(', ')}
        rout={'/'}
      />
      <div className={'jorneydiscovey-header'}>
        <span className={'jorneydiscovey-header-txt'}>
          Thinking About Plans for the Week
        </span>
        <div className={'jorneydiscovey-header-btn'}>
          <span className={'jorneydiscovey-header-btn-txt'}>Podcasts</span>
        </div>
      </div>
      <div className={'jorneydiscovey-body'}>
        {myData
          .sort((el1, el2) => {
            if (el1.orderNumber < el2.orderNumber) return -1;
            if (el1.orderNumber > el2.orderNumber) return 1;
            return 0;
          })
          .map((section) => generateContent(section))}
        <AnswerNotFound id={1}/>
      </div>
    </div>
  );
};

export default Article;
