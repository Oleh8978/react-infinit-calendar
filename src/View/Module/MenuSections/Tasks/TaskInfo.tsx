import React, { useState } from 'react';

// component
import NavigationBar from 'component/NavigationBar';

interface IProps {}

const TaskInfo: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'task-info'}>
      <NavigationBar rout={'/schedule'} name={'Task Info'} hasSaveButton={false}/>
    </div>
  );
};

export default TaskInfo;
