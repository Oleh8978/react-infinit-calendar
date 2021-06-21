import React from 'react';

// interfaces
import { IListItem } from './Models';

interface IProps {
  data: IListItem[];
}

const JourneyListComponent: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'journeyinfo-body-listcomponent'}>
      <ul className="overview-list__regular-wrapper journeyinfo-body-listcomponent-listWrapper">
        {props.data.map((item) => {
          return (
            <li
              className={
                'overview-list__regular-item journeyinfo-body-listcomponent-listWrapper-item'
              }>
              {' '}
              {item.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default JourneyListComponent;
