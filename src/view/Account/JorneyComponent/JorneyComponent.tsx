import React from 'react';

// components
// import Link from '@app/routing/Link';
import { Link } from 'react-router-dom';

// interfaces
import { IJourney } from '@app/controller/statisticList/models';

// helpers
import * as helpers from '../utils';
import CircularProgressBar from '@app/component/CircularProgressBar';

// utils 
import { hoursConverter } from '../utils';

interface IProps {
  data: IJourney;
}

const JorneyComponent: React.FC<IProps> = ({ ...props }) => {
  console.log('props statistic ', props.data)
  return (
    <>
      {/* {props.data.statistic.endDate ? ( */}
      <Link to={`/journey-info/${props.data.id}`}>
        <div className={'single-jorney-component__column'}>
          <div className={'single-jorney-component__column-header'}>
            <span className={'single-jorney-component__column-header-text'}>
              {props.data.title}
            </span>
          </div>
          <div className={'single-jorney-component__column-body'}>
            <div className={'single-jorney-component__column-body__left'}>
              <div
                className={
                  'single-jorney-component__column-body__left-text__top'
                }>
                <span
                  className={
                    'single-jorney-component__column-body__left-text__top-numbers'
                  }>
                  {hoursConverter(props.data.statistic.spent)} / {hoursConverter(props.data.statistic.maxSpent)}
                </span>
                <span
                  className={
                    'single-jorney-component__column-body__left-text__top-description'
                  }>
                  hrs spent
                </span>
              </div>
              {/* <div
                className={
                  'single-jorney-component__column-body__left-text__bottom'
                }>
                {' '}
                <span
                  className={
                    'single-jorney-component__column-body__left-text__bottom-date'
                  }>
                  {helpers.dateCreatorSlashes(
                    new Date(props.data.statistic.endDate).getDate(),
                    new Date(props.data.statistic.endDate).getMonth() + 1,
                    new Date(props.data.statistic.endDate).getFullYear(),
                  )}
                </span>
                <span
                  className={
                    'single-jorney-component__column-body__left-text__bottom-description'
                  }>
                  ends
                </span>
              </div> */}
            </div>
            <div className={'single-jorney-component__column-body__right'}>
              <CircularProgressBar
                sqSize={110}
                percentage={Math.round(
                  (props.data.statistic.spent / props.data.statistic.maxSpent) *
                    100,
                )}
                strokeColor={props.data.accentColor || '#83DCBC'}
              />
            </div>
          </div>
        </div>
      </Link>
      {/* ) : (
        <Link to={`/journey-info/${props.data.id}`}>
          <div className={'single-jorney-component__row'}>
            <div className={'single-jorney-component__row-header'}>
              <span className={'single-jorney-component__row-header-text'}>
                {props.data.title}
              </span>
            </div>
            <div className={'single-jorney-component__row-body'}>
              <div className={'single-jorney-component__row-body-wrapper'}>
                <span
                  className={
                    'single-jorney-component__row-body__left-text__top-numbers'
                  }>
                  {props.data.statistic.spent}
                </span>
                <span
                  className={
                    'single-jorney-component__row-body__left-text__top-description'
                  }>
                  hrs spent
                </span>
              </div>
            </div>
          </div>
        </Link>
      )} */}
    </>
  );
};

export default JorneyComponent;
