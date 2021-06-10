import React from 'react';

export interface IProps {
}

export const Loader:React.FC<IProps> = () => {
  return <div className={"loader"}><span></span><span></span><span></span><span></span></div>
}

export default Loader;
