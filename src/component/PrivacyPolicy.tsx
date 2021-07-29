import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import history from '@app/historyApi';

// components
import NavigationBar from './NavigationBar';
import Loader from '@app/component/Loader';

// interfaces
import { StaticPageDTO } from '@ternala/frasier-types';
import { IStore } from '@app/controller/model';

/// actions
import { getPageBySlug } from '@app/controller/staticPage/actions';

const PrivacyPolicy: React.FC<any> = ({ ...props }) => {
  const checkIFMyCompExists = () => !!document.querySelector('.main-layout');

  const elementExists = !checkIFMyCompExists();
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.staticPage === undefined) {
      dispatch(
        getPageBySlug.request(
          String(history.location.pathname).replace(/\//g, ''),
        ),
      );
    }
  }, [props.staticPage]);
  return (
    <div className={'privacypage'}>
      <NavigationBar
        name={'Privacy Policy'}
        rout={elementExists ? '/' : '/about'}
      />
      <>{props.staticPage ? <>{props.staticPage.contnet}</> : <Loader />}</>
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
