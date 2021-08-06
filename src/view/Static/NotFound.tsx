import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

// Components
import Link from '@app/routing/Link';

// static
import img from './static/404.png';

//Interfaces
type IProps = RouteComponentProps;

const NotFound: React.FC<IProps> = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-page-wrapper">
        <div className="not-found-page-header">
          <span className="not-found-page-header__top">404 Page not found</span>
          <span className="not-found-page-header__bottom">
            The page you are looking for was moved, removed or renamed
          </span>
          <Link to="discovery" className="not-found-page-btn">
            <div className="not-found-page-btn-txt">Go to home page</div>
          </Link>
        </div>
        <div className="not-found-page-body">
          <img className="not-found-page-body-img" src={img} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
