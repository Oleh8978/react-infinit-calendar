import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// components
import Loader from '@app/component/Loader';
import AnswerNotFound from '../AnswerNotFound/AnswerNotFound';
import ImageL from '@app/component/Image';

//uuid
import uuid from '@app/utils/uuid';

// interface
import { DiscoveryDTO } from '@ternala/frasier-types';
import { ISetLoadingAction } from '@app/controller/Discovery/model';
import parse from 'html-react-parser';

interface IProps {
  margin: number;
  discoveryItems: DiscoveryDTO[];
  isLoading?: ISetLoadingAction;
  internalLoader: boolean;
  itemsCount?: {
    counts: number;
  };
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
      {props.discoveryItems === undefined ? (
        <Loader />
      ) : (
        <div className={'discovery-list'} ref={fieldRef}>
          {props.isLoading.status === false &&
          props.discoveryItems !== undefined && props.discoveryItems.length !== 0 ? (
            <span className="discovery-list-title">Full list</span>
          ) : (
            <></>
          )}
          <>
            <div className="discovery-list-holder">
              {discoveryItems.length > 0 &&
                discoveryItems.map((item: any): DiscoveryDTO => {
                  if (
                    Object.keys(item).find(
                      (element) => String(element) === 'article',
                    ) !== undefined
                  ) {
                    if (item.article.appearance === 'small') {
                      return (
                        <Link
                          to={'article/' + String(item.article.id) + '/d'}
                          key={uuid()}
                          className="discovery-list-item-holder__half"
                          style={{ display: 'flex', flexFlow: 'row' }}>
                          <ImageL
                            className={'discovery-list-item-img__half'}
                            src={item.article.image}
                          />
                          <span className="card-text-wrapper-link">
                            <span>
                              <h1 className="card-text-header">
                                {item.article.title}
                              </h1>
                            </span>
                            {item.article.description}
                          </span>
                        </Link>
                      );
                    } else if (item.article.appearance === 'large') {
                      // for large article will needt ocreate a case where this article will have large card
                      return (
                        <Link
                          to={'article/' + String(item.article.id) + '/d'}
                          key={uuid()}
                          className="discovery-list-item-fullarticle"
                          style={{ display: 'flex', flexFlow: 'column' }}>
                          <span className="card-text-wrapper-link">
                            <h1 className="card-text-header">
                              {item.article.title}
                            </h1>
                            {item.article.description}
                          </span>
                          <ImageL
                            className={'discovery-list-item-img__fullarticle'}
                            src={item.article.image}
                          />
                        </Link>
                      );
                    }
                  } else if (
                    Object.keys(item).find(
                      (element) => String(element) === 'journey',
                    ) !== undefined
                  ) {
                    return (
                      <Link
                        to={'journey/' + String(item.journey.id)}
                        key={uuid()}
                        >
                        <div className="discovery-list-item-holder">
                          <div className="discovery-list-item-imgwrapper">
                            <ImageL
                              className={'discovery-list-item-img'}
                              src={item.journey.image}
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
                })}
              <>
                {' '}
                {props.itemsCount !== undefined &&
                props.itemsCount.counts === discoveryItems.length &&
                props.isLoading.status === false && props.internalLoader === false ? (
                  <AnswerNotFound id={1}/>
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
