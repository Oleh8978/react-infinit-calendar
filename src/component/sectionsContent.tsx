import React from 'react';
import parse from 'html-react-parser';
import TextComponent from '@app/view/Account/JourneyInfo/JourneyTextComponents';
import { generateContent } from '@app/view/Discovery/Article';
import { JourneyGetResponse } from '@ternala/frasier-types';

interface IProps {
  journey: JourneyGetResponse;
}

const SectionsContent: React.FC<IProps> = ({ journey, ...props }) => {
  return (
    <>
      {journey.sections
        .sort((el1, el2) => {
          if (el1.orderNumber < el2.orderNumber) return -1;
          if (el1.orderNumber > el2.orderNumber) return 1;
          return 0;
        })
        .map((section) => (
          <TextComponent data={generateContent(section)} />
        ))}
    </>
  );
};

export default SectionsContent;
