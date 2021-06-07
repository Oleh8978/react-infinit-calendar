import React from 'react';

export interface IProps {
}

export const Loader:React.FC<IProps> = () => {
  return <div className={"loader"} style ={{width: '100%', height: '100%', backgroundColor: 'red', position: 'absolute'}}><span></span><span></span><span></span>Loading......</div>
}

export default Loader;