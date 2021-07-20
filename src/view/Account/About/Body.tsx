import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

// components
import Arrow from '../Settings/ButtonTypes/Arrow';
import Loader from '@app/component/Loader';
import { Link } from 'react-router-dom';

// interfaces
import { StaticPageDTO } from '@ternala/frasier-types';
import { IStore } from '@app/controller/model';

// static
import { About } from '../Settings/settingsConfig';

/// actions
import { staticPagesList } from '@app/controller/staticPage/actions';

interface IProps {}

const BodyPage: React.FC<any> = ({ ...props }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.listOfStaticPages === undefined) {
      dispatch(staticPagesList.request({}));
    }
  }, [props.listOfStaticPages]);

  return (
    <>
      {props.listOfStaticPages !== undefined ? (
        <div className={'aboutpage-links'}>
          <div className={'block-body'}>
            <>
              <div className={'block-body-item-wrapper'}>
                <span className={'block-body-item-wrapper-text about-text'}>
                  {/* {props.name} */}
                </span>
                <span className={'block-body-item-wrapper-text rightaligner'}>
                  {/* {props.version} */}
                </span>
              </div>
            </>
            {props.listOfStaticPages.map((item: StaticPageDTO) => {
              return (
                <>
                  <Link
                    className={'block-body-item-wrapper'}
                    to={`${String(item.slug)
                      .toLowerCase()
                      .replace(/_/g, '-')}`}>
                    <span
                      className={'block-body-item-wrapper-text'}
                      style={{ color: '#373737' }}>
                      {item.title}
                    </span>
                    <Arrow />
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

// export default BodyPage;

export default connect(
  (state: IStore) => ({
    listOfStaticPages: state.staticPagesListReducer.state.items,
    loaderGeneral: state.staticPagesListReducer.loaderState.status,
  }),
  {
    staticPagesList,
  },
)(BodyPage);
