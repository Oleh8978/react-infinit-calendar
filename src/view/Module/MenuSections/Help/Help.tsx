import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

import HelpSection from '../Overview/HelpSection/HelpSection';
import Slider from '../Overview/HelpSection/Slider';
import Questions from './Questions';
import { experts } from '../staticHardcoded/data';

//actions
import { getExpersList } from '@app/controller/experts/actions';

// interfaces
import { IStore } from '@app/controller/model';

interface IProps {}

const Help: React.FC<any> = ({ ...props }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.expertState.counts === undefined) {
      dispatch(
        getExpersList.request({
          limit: 100,
          offset: 0,
          query: '',
          moduleCategories: [Number(Object.keys(props.moduleId)[0])],
        }),
      );
    }
  }, [props.expertState.items, props.moduleId]);

  return (
    <div className={'help'}>
      <HelpSection
        header={'Do you need any help with ACCOUNTING?'}
        description={
          'Book a consultation with one of our lead accounting experts'
        }
      />
      {props.expertState.items !== undefined ? (
        <Slider people={props.expertState.items} isMain={true} />
      ) : (
        <></>
      )}

      <Questions text={'Frequently Asked Questions'} />
    </div>
  );
};

export default connect(
  (state: IStore) => ({
    articles: state.articleListReducer.state,
    expertState: state.expertListReducer.state,
    moduleId: state.moduleState.moduleData,
    counts: state.expertListReducer.state.counts,
  }),
  {
    getExpersList,
  },
)(Help);
