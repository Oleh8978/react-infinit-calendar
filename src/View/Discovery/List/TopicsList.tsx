import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { dataList } from '../FakeData/list/List';

// components
import Loader from 'Component/Loader';
import AnswerNotFound from '../AnswerNotFound/AnswerNotFound';

// history
import history from 'historyApi';

// interface
import { ArticleDTO, DiscoveryDTO } from '@ternala/frasier-types';
import { ISetLoadingAction } from 'Controller/Discovery/model';

// HOC
import useScrollListener from 'View/Schedule/Calendar/customHOC';

interface IProps {
  margin: number;
  discoveryItems: DiscoveryDTO[];
  isLoading?: ISetLoadingAction;
  itemsCount?: number;
  loadMore?: (callback?: any, loadMore?: string) => void;
}

const DiscoveryTopicList: React.FC<IProps> = ({ ...props }) => {
  const [discoveryItems, setDiscoveryItems] = useState<DiscoveryDTO[]>([]);
  const fieldRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.discoveryItems !== undefined) {
      setDiscoveryItems(props.discoveryItems);
    }
    // document
    //   .querySelector('.discovery-main-wrapper')
    //   .addEventListener('scroll', () => handleScroll());
    // return () => {
    //   document
    //     .querySelector('.discovery-main-wrapper')
    //     .removeEventListener('scroll', () => handleScroll());
    // };
  }, [props.discoveryItems]);

  // const loadMoreDiscoveries = () => {
  //   props.loadMore();
  // };

  const scrolledSetter = () => {
    const scrolled = document.querySelector('.discovery-list').scrollTop;
    console.log('height ', scrolled);
  };

  return (
    <div className={'discovery-list'} ref={fieldRef}>
      <span className="discovery-list-title">Full list</span>
      <>
        {props.isLoading.status ? (
          <Loader isSmall={true} />
        ) : (
          <div className="discovery-list-holder">
            {discoveryItems.length > 0 &&
              discoveryItems.map(
                (item): DiscoveryDTO => {
                  // if (item.article.appearance === 'small') {
                  // return (
                  //   <div className="discovery-list-item-holder">
                  //     <div className="discovery-list-item-imgwrapper">
                  //       <img
                  //         className="discovery-list-item-img"
                  //         src={item.article.image}
                  //         alt="image"
                  //       />
                  //     </div>

                  //     <div
                  //       className="discovery-list-item-description"
                  //       style={{
                  //         color: 'red',
                  //         backgroundColor: 'yellow',
                  //       }}>
                  //       <span className="card-text-wrapper">
                  //         <h1 className="card-text-header">{item.article.title}</h1>
                  //         {item.article.sections}
                  //       </span>
                  //   </div>
                  // </div>
                  // );
                  //     } else if (item.article.appearance === 'half') {
                  if (
                    Object.keys(item).find(
                      (element) => String(element) === 'article',
                    ) !== undefined
                  ) {
                    if (item.article.appearance === 'small') {
                      return (
                        <div
                          className="discovery-list-item-holder__half"
                          style={{ display: 'flex', flexFlow: 'row' }}>
                          <img
                            className="discovery-list-item-img__half"
                            src={item.article.image}
                            alt="image"
                          />
                          <span className="card-text-wrapper-link">
                            <Link to={`article/${item.article.id}`}>
                              <h1 className="card-text-link">
                                {item.article.title}
                              </h1>
                            </Link>
                            {/* <h1 className="card-text-header">{item.title}</h1>*/}
                            {item.article.description}
                          </span>
                        </div>
                      );
                    } else if (item.article.appearance === 'large') {
                      // for large article will needt ocreate a case where this article will have large card
                      return (
                        <div
                          className="discovery-list-item-holder__half"
                          style={{ display: 'flex', flexFlow: 'row' }}>
                          <img
                            className="discovery-list-item-img__half"
                            src={item.article.image}
                            alt="image"
                          />
                          <span className="card-text-wrapper-link">
                            {/* <Link to={'article'}> */}
                            <h1 className="card-text-link">
                              {item.article.title}
                            </h1>
                            {/* </Link> */}
                            {/* <h1 className="card-text-header">{item.title}</h1>*/}
                            {item.article.description}
                          </span>
                        </div>
                      );
                    }
                  } else if (
                    Object.keys(item).find(
                      (element) => String(element) === 'journey',
                    ) !== undefined
                  ) {
                    return (
                      <>
                        <div className="discovery-list-item-holder">
                          <div className="discovery-list-item-imgwrapper">
                            <img
                              className="discovery-list-item-img"
                              src={item.journey.image}
                              alt="image"
                            />
                          </div>

                          <div
                            className="discovery-list-item-description"
                            style={{
                              color: 'red',
                              backgroundColor: item.journey.accentColor,
                            }}>
                            <span className="card-text-wrapper">
                              <h1 className="card-text-header">
                                {item.journey.title}
                              </h1>
                              {item.journey.subTitle}
                            </span>
                          </div>
                        </div>
                      </>
                    );
                  }
                },
              )}
            <>
              {props.itemsCount === discoveryItems.length ? (
                <AnswerNotFound />
              ) : (
                <> </>
              )}
            </>
          </div>
        )}
      </>
    </div>
  );
};

export default DiscoveryTopicList;
