import React, { useState, useEffect } from 'react';

// interfaces
import { IListItemCompleted } from '../Models';
import { IJourney } from 'Controller/statisticList/models';

// hardcodedData
import { dataModulesCompleted } from '../hardcodedData/data';

// helpers
import * as helpers from '../utils';

interface IProps {
  data: IJourney;
}

const JourneyCompletedItem: React.FC<IProps> = ({ ...props }) => {
  const icons = ['👏', '👍'];
  const [selectedIcon, setSelectedIcon] = useState<string>(
    icons[Math.floor(Math.random() * 2)],
  );
  console.log('props.data ', props.data);
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
              {(props.data.statistic.completedTaskCount / 100) *
                props.data.statistic.maxTaskCount}
              %
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
              {props.data.statistic.spent > 1440
                ? Math.floor(props.data.statistic.spent / 1440)
                : 0}
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
              {props.data.statistic.spent > 60
                ? Math.floor(props.data.statistic.spent / 60)
                : props.data.statistic.spent}
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
            new Date(props.data.statistic.startDate).getDate(),
            new Date(props.data.statistic.startDate).getMonth() + 1,
            new Date(props.data.statistic.startDate).getFullYear(),
          )}{' '}
          -{' '}
          {helpers.dateCreatorSlashes(
            new Date(props.data.statistic.endDate).getDate(),
            new Date(props.data.statistic.endDate).getMonth() + 1,
            new Date(props.data.statistic.endDate).getFullYear(),
          )}
        </div>
      </div>
    </div>
  );
};

export default JourneyCompletedItem;
