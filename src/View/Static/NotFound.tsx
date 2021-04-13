import React from "react";
import { RouteComponentProps } from 'react-router-dom';

// Components
import Link from 'Routing/Link';

//Interfaces
interface IProps extends RouteComponentProps {

}


const NotFound: React.FC<IProps> = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-page__content">
        <h3>404</h3>
        <p>Page is not found</p>
        <Link to="discovery">Go to home page</Link>
      </div>
    </div>
  )
}

export default NotFound;