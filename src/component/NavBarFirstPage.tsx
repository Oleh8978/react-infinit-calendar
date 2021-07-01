import React from 'react';
import { connect } from 'react-redux';

// Actions
import { setAuthenticatedStatus, logOut } from '@app/controller/auth/actions';

// interface IProps {
//   logoutMethod: () => void;
// }

const NavigationBarFirstPage: React.FC<any> = ({ ...props }) => {
  return (
    <>
      <div className={'module-menu'}>
        <div
          className="module-menu-col1"
          onClick={() => {
            props.logOut();
            props.logoutMethod();
          }}>
          <div className="module-menu-back">
            <div className="module-menu-back__top" />
            <div className="module-menu-back__bottom" />
          </div>
        </div>
        <div className="module-menu-col2">Profile information</div>
        <div className="module-menu-col3" />
      </div>
    </>
  );
};

export default connect(() => ({}), {
  setAuthenticatedStatus,
  logOut: logOut.request,
})(NavigationBarFirstPage);
