import React, { useState, useEffect } from 'react';

import img from '@app/asset/images/noNet.png';

interface IProps {}

const NoConnection: React.FC<IProps> = ({ ...props }) => {
  const reloader = () => {
    location.reload();
    return false;
  };
  return (
    <div className="internet-connection">
      <div className="internet-connection_top">
        <span className="internet-connection_top-header">
          Looks like You are offline
        </span>
        <span className="internet-connection_top-subheader">
          We couldn’t load this page
        </span>
        <div className="internet-connection_top-btn" onClick={() => reloader()}>
          Retry
        </div>
      </div>
      <img className="internet-connection_bottom-img" src={img} alt="img" />
    </div>
  );
};

export default NoConnection;
