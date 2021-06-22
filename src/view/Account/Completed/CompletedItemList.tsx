import React, { useState, useEffect } from 'react';

// interfaces
import { IListItemCompleted } from '../Models';

// hardcodedData
import { dataModulesCompleted } from '../hardcodedData/data';

// helpers
import * as helpers from '../utils';

interface IProps {
  data: IListItemCompleted;
}

const JourneyCompletedItem: React.FC<IProps> = ({ ...props }) => {
  const icons = ['👏', '👍'];
  const [selectedIcon, setSelectedIcon] = useState<string>(
    icons[Math.floor(Math.random() * 2)],
  );

  return (
    <div className={'journey-completed-item'}>
      <div className={'journey-completed-item-header'}>
        Completed {selectedIcon}
      </div>
      <div className={'journey-completed-item-body'}>
        <div className={'journey-completed-item-body-title'}>
          {props.data.title}
        </div>
        <div className={'journey-completed-item-body-description'}>
          <span className={'journey-completed-item-body-description-progress'}>
            <span
              className={
                'journey-completed-item-body-description-progress__top'
              }>
              {props.data.percentageOfTasks}%
            </span>
            <span
              className={
                'journey-completed-item-body-description-progress__bottom'
              }>
              of tasks
            </span>
          </span>
          <span className={'journey-completed-item-body-description-days'}>
            <span
              className={'journey-completed-item-body-description-days__top'}>
              {props.data.days}
            </span>
            <span
              className={
                'journey-completed-item-body-description-days__bottom'
              }>
              days
            </span>
          </span>
          <span className={'journey-completed-item-body-description-hours'}>
            <span
              className={'journey-completed-item-body-description-hours__top'}>
              {props.data.days}
            </span>
            <span
              className={
                'journey-completed-item-body-description-hours__bottom'
              }>
              hours
            </span>
          </span>
        </div>
        <div className={'journey-completed-item-body-footer'}>
          {helpers.dateCreatorSlashes(
            new Date(props.data.startedAt).getDate(),
            new Date(props.data.startedAt).getMonth() + 1,
            new Date(props.data.startedAt).getFullYear(),
          )}{' '}
          -{' '}
          {helpers.dateCreatorSlashes(
            new Date(props.data.endedAt).getDate(),
            new Date(props.data.endedAt).getMonth() + 1,
            new Date(props.data.endedAt).getFullYear(),
          )}
        </div>
      </div>
    </div>
  );
};

export default JourneyCompletedItem;
