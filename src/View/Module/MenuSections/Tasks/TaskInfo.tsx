import React, { useState } from 'react';

// component
import NavigationBar from 'Component/NavigationBar';

interface IProps {}

const TaskInfo: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'task-info'}>
      <NavigationBar rout={'/schedule'} name={'Task Info'} />
    </div>
  );
};

export default TaskInfo;
