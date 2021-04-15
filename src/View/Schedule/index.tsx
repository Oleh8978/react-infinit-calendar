import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {}

const Schedule: React.FC<IProps> = () => {
  return (
    <div className={"schedule"}>
      This is schedule page
    </div>
  )
}

export default Schedule