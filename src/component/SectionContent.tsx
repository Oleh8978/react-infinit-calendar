import parse from 'html-react-parser';
import VideoComponent from '@app/view/Module/MenuSections/Overview/Video';
import EmbeddedIframe from '@app/view/Module/MenuSections/Overview/EmbeddedIframe';
import AdditionalLink from '@app/view/Module/MenuSections/Overview/AdditionalLink';
import link from '@app/view/Module/MenuSections/staticHardcoded/link.png';
import Slider from '@app/view/Module/MenuSections/Overview/HelpSection/Slider';
import React from 'react';
import { SectionShortDTO } from '@ternala/frasier-types';

export const SectionContent: React.FC<{ section: SectionShortDTO }> = ({
  section,
}) => {
  console.log('section: ', section);
  switch (section.type) {
    case 'text':
      return section.content ? (
        <div className="overview-text" key={section.id}>
          {section.content ? parse(`${section.content}`) : ''}
        </div>
      ) : (
        <></>
      );
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
    case 'iframe_popup':
      return (
        <VideoComponent
          content={parse(`${section.content}`)}
          img={section.url}
          key={section.id}
        />
      );
    case 'embedded_iframe':
      return (
        <EmbeddedIframe
          content={parse(`${section.content}`)}
          key={section.id}
        />
      );
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
    // case 'showcase_widget':
    //   return (
    //     <Slider
    //       isMain={false}
    //       people={section.content || []}
    //       key={section.id}
    //     />
    //   );
    //   break;
    default:
      return section.content ? (
        <div className="overview-text" key={section.id}>
          {section.content ? parse(`${section.content}`) : ''}
        </div>
      ) : (
        <></>
      );
  }
};
