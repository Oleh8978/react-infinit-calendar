import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

// components
import NaviagtionBar from '@app/component/NavigationBar';
import Slider from '@app/view/Module/MenuSections/Overview/HelpSection/Slider';
import ContactList from './ContactListWrapper';

//actions
import { getExpersList } from '@app/controller/experts/actions';
import { IStore } from '@app/controller/model';
import { getExpertById } from '@app/controller/expert/actions';

interface IProps {}

const ExpertHelp: React.FC<any> = ({ ...props }) => {
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

    if (props.selectedExpert !== undefined) {
      dispatch(getExpertById.request(props.selectedExpert));
    }
  }, [props.expertState.counts, props.moduleId, props.selectedExpert]);

  return (
    <div className={'expert-help'}>
      <NaviagtionBar rout="module" name={'Expert help'} />
      <div className="expert-help-main">
        {props.expertState.items !== undefined ? (
          <Slider
            people={props.expertState.items}
            isMain={false}
            marginBottom={true}
          />
        ) : (
          <></>
        )}
        <div className="expert-help-main-body">
          <div className="expert-help-main-body-header">
            {props.expert.id ? (
              <span className="expert-help-main-body-header-text__top">
                Acountan
              </span>
            ) : (
              <></>
            )}
          </div>
          {props.expert ? <ContactList data={props.expert} /> : <></>}
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: IStore) => ({
    articles: state.articleListReducer.state,
    expertState: state.expertListReducer.state,
    moduleId: state.moduleState.moduleData,
    expert: state.SingleExpertReducer.state,
    selectedExpert: state.ExpertSelectedStateReducer.expert,
  }),
  {
    getExpertById,
    getExpersList,
  },
)(ExpertHelp);
