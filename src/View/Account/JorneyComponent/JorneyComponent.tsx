import React from 'react';

// components
import Link from 'routing/Link';

// interfaces
import { IModule } from '../Models';

// helpers
import * as helpers from '../utils';
import CircularProgressBar from '../../../component/CircularProgressBar';

interface IProps {
  data: IModule;
}

const JorneyComponent: React.FC<IProps> = ({ ...props }) => {
  return (
    <>
      {props.data.hours ? (
        <Link to={'journey-info'}>
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
                    {props.data.hoursSpent} / {props.data.hours}
                  </span>
                  <span
                    className={
                      'single-jorney-component__column-body__left-text__top-description'
                    }>
                    hrs spent
                  </span>
                </div>
                <div
                  className={
                    'single-jorney-component__column-body__left-text__bottom'
                  }>
                  {' '}
                  <span
                    className={
                      'single-jorney-component__column-body__left-text__bottom-date'
                    }>
                    {helpers.dateCreatorSlashes(
                      new Date(props.data.ends).getDate(),
                      new Date(props.data.ends).getMonth() + 1,
                      new Date(props.data.ends).getFullYear(),
                    )}
                  </span>
                  <span
                    className={
                      'single-jorney-component__column-body__left-text__bottom-description'
                    }>
                    ends
                  </span>
                </div>
              </div>
              <div className={'single-jorney-component__column-body__right'}>
                <CircularProgressBar sqSize={110} percentage={Math.round(props.data.hoursSpent / props.data.hours * 100)} strokeColor={props.data.color || '#83DCBC'}/>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <Link to={'journey-info'}>
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
                  {props.data.hoursSpent}
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
      )}
    </>
  );
};

export default JorneyComponent;
