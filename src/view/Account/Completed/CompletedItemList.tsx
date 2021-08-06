import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// interfaces
import { IListItemCompleted } from '../Models';
import { IJourney } from '@app/controller/statisticList/models';

// helpers
import * as helpers from '../utils';
import EmojiRandomizer from '@app/component/emojiRandomizer';

interface IProps {
  data: IJourney;
}

const JourneyCompletedItem: React.FC<IProps> = ({ ...props }) => {
  const statisticDataReturner = () => {
    if (
      props.data.statistic.maxTaskCount ===
      props.data.statistic.completedTaskCount
    ) {
      return 100;
    }

    if (
      props.data.statistic.maxTaskCount &&
      props.data.statistic.completedTaskCount
    ) {
      return Number.parseFloat(
        String(
          (props.data.statistic.maxTaskCount /
            props.data.statistic.completedTaskCount) *
            100,
        ),
      ).toFixed(1);
    }

    if (props.data.statistic.completedTaskCount === 0) {
      return 0;
    }
  };
  return (
    <Link
      to={`/journey-info/${props.data.id}`}
      className={'journey-completed-item'}>
      <div className={'journey-completed-item-header'}>
        Completed <EmojiRandomizer />
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
              {statisticDataReturner()}%
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
                ? Number.parseFloat(
                    String(props.data.statistic.spent / 1440),
                  ).toFixed(1)
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
    </Link>
  );
};

export default JourneyCompletedItem;
