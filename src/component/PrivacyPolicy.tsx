import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import history from '@app/historyApi';

// components
import NavigationBar from './NavigationBar';
import Loader from '@app/component/Loader';

// interfaces
import { IStore } from '@app/controller/model';

/// actions
import { getPageBySlug } from '@app/controller/staticPage/actions';

import parser from 'html-react-parser';

const PrivacyPolicy: React.FC<any> = ({ ...props }) => {
  const checkIFMyCompExists = () => !!document.querySelector('.main-layout');

  const elementExists = !checkIFMyCompExists();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getPageBySlug.request(
        String(history.location.pathname).replace(/\//g, ''),
      ),
    );
  }, [history.location.pathname]);
  return (
    <div className={'privacypage'}>
      <NavigationBar
        name={'Privacy Policy'}
        rout={elementExists ? '/' : '/about'}
      />
      <>
        {props.staticPage ? (
          <div className={'parsed-contnet'}>
            {' '}
            <div className="parsed-contnet-title">{props.staticPage.title}</div>
            {parser(String(props.staticPage.content))}
          </div>
        ) : (
          <Loader />
        )}
      </>
    </div>
  );
};

export default connect(
  (state: IStore) => ({
    loader: state.staticPageReducer.loaderState.status,
    staticPage: state.staticPageReducer.state,
  }),
  {
    getPageBySlug,
  },
)(PrivacyPolicy);
