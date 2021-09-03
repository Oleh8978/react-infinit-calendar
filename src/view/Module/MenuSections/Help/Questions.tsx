import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

import { dataList } from '../staticHardcoded/data';
import history from '../../../../historyApi';

// actions
import { getArticleListByModuleCqategory } from '@app/controller/articles/actions';

//components
import { Link } from 'react-router-dom';
import AnswerNotFound from '../../../Discovery/AnswerNotFound/AnswerNotFound';
import Loader from '@app/component/Loader';

// interfaces
import { IStore } from '@app/controller/model';

interface IProps {
  text: string;
}

const Questions: React.FC<any> = ({ ...props }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      props.articles.counts === undefined &&
      Object.keys(props.moduleId)[0] !== undefined
    ) {
      dispatch(
        getArticleListByModuleCqategory.request({
          limit: 10,
          offset: 0,
          query: '',
          moduleCategories: [Number(Object.keys(props.moduleId)[0])],
        }),
      );
    }
  }, [props.articles.counts, props.moduleId]);

  if (props.articles.counts === undefined) {
    return <Loader />;
  }

  return (
    <>
      <>
        <h2 className={'questions-title'}>{props.text}</h2>
        {props.articles.items.map((item: any) => {
          if (item.appearance === 'big') {
            return (
              <Link
                to={'/article/' + String(item.id) + 'q'}
                className="discovery-list-item-holder">
                <div className="discovery-list-item-imgwrapper">
                  <img
                    className="discovery-list-item-img"
                    src={item.im}
                    alt="image"
                  />
                </div>
                <div
                  className="discovery-list-item-description"
                  style={{
                    color: item.color,
                    backgroundColor: item.backgroundColor,
                  }}>
                  <span className="card-text-wrapper">
                    <h1 className="card-text-header">{item.title}</h1>
                    {item.description}
                  </span>
                  <div className="card-text-start-btn">{item.link}</div>
                </div>
              </Link>
            );
          } else if (item.appearance === 'small') {
            return (
              <Link
                to={'/article/' + String(item.id) + '/q'}
                className="discovery-list-item-holder__half"
                style={{ display: 'flex', flexFlow: 'row' }}>
                <img
                  className="discovery-list-item-img__half"
                  src={item.image}
                  alt="image"
                />
                <span
                  className="card-text-wrapper-link"
                  style={{ color: item.color }}>
                  <h1 className="card-text-link">{item.link}</h1>
                  <h1 className="card-text-header">{item.title}</h1>
                  {item.description}
                </span>
              </Link>
            );
          }
        })}
      </>
      {props.counts !== undefined &&
      props.articles.items.length === props.counts ? (
        <AnswerNotFound id={2} />
      ) : (
        <>
          <Loader isSmall={true} />
        </>
      )}
    </>
  );
};

export default connect(
  (state: IStore) => ({
    articles: state.articleListReducer.state,
    counts: state.articleListReducer.state.counts,
    moduleId: state.moduleState.moduleData,
  }),
  {
    getArticleListByModuleCqategory,
  },
)(Questions);
