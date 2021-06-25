import { RouteComponentProps } from 'react-router-dom';
import React, { useEffect } from 'react';
import NavigationMenu from './Menu';
import Overview from './MenuSections/Overview/Overview';
import Help from './MenuSections/Help/Help';
import Notes from './MenuSections/Notes/Notes';
import Tasks from './MenuSections/Tasks/Tasks';

// config
import { menuOptions } from './constants';
import { useDispatch } from 'react-redux';
import { getScheduleAction } from '@app/controller/module/actions';
import { limitGetScheduleDays } from '@app/config/constants';

type IProps = RouteComponentProps<{ id: string; tabName: string }>;

const generateContent = (tab: string, id) => {
  switch (tab) {
    case 'note':
      return <Notes />;
    case 'help':
      return <Help />;
    case 'task':
      return <Tasks tabName={tab} id={id}/>;
    case 'overview':
    default:
      return <Overview id={id} />;
  }
};

export const ModuleTabContent: React.FC<IProps> = ({
  match: { params },
  ...props
}) => {
  const id = params?.id;
  const tabName = params?.tabName;
  const idNumber = Number(id);


  return (
    <>
      <NavigationMenu menuOptions={menuOptions} tabName={tabName} id={id} />
      <div className={'module-sections'}>{generateContent(tabName, id)}</div>
    </>
  );
};

export default ModuleTabContent;
