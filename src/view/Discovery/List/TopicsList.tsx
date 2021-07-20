import React, { useState, useEffect } from 'react';
import Link from '@app/routing/Link';

// components
import Loader from '@app/component/Loader';
import AnswerNotFound from '../AnswerNotFound/AnswerNotFound';

// interface
import { DiscoveryDTO } from '@ternala/frasier-types';
import { ISetLoadingAction } from '@app/controller/Discovery/model';
import parse from 'html-react-parser';

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
  }, [props.discoveryItems]);

  return (
    <>
      {props.isLoading.status === true && props.discoveryItems === undefined ? (
        <Loader />
      ) : (
        <div className={'discovery-list'} ref={fieldRef}>
          <span className="discovery-list-title">Full list</span>
          <>
            {/* {props.isLoading.status === true && discoveryItems.length === 0 ? ( */}

            {/* ) : ( */}
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
                              <Link
                                to={'article'}
                                params={{ id: String(item.article.id) }}>
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
                      // console.log('id: ', item.journey.id);
                      return (
                        <Link
                          to={'journey'}
                          params={{ id: String(item.journey.id) }}>
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
                                {parse(item.journey.subTitle)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    }
                  },
                )}
              <>
                {' '}
                {props.itemsCount === discoveryItems.length ? (
                  <AnswerNotFound />
                ) : (
                  <Loader isSmall={true} />
                )}
              </>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default DiscoveryTopicList;
