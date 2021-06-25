import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ArticleDTO, TaskFullDTO } from '@ternala/frasier-types';
import { useSelector } from 'react-redux';

// components
import NavigationBar from '@app/component/NavigationBar';
import AnswerNotFound from '@app/view/Discovery/AnswerNotFound/AnswerNotFound';
import Loader from '@app/component/Loader';

// Transport
import { getAccessToken } from '@app/controller/auth';
import { SectionContent } from '@app/component/SectionContent';
import NotFound from '@app/view/Static/NotFound';
import { TaskAPI } from '@app/controller/task/transport/task.api';

type IProps = RouteComponentProps<{ id: string }>;

const Task: React.FC<IProps> = (props) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [task, setTask] = useState<TaskFullDTO | undefined>();
  const id = Number(props.match.params.id);

  if (isNaN(id))
    return (
      <NotFound
        history={props.history}
        location={props.location}
        match={props.match}
      />
    );

  const tokenPromise = useSelector(getAccessToken);

  useEffect(() => {
    setLoading(true);

    tokenPromise.then((token) => {
      TaskAPI.getTask(id, token).then((task) => {
        if (typeof task !== 'string') {
          setTask(task);
          setLoading(false);
        }
      });
    });
  }, []);

  if (isLoading) return <Loader />;

  const myData = [].concat(task.sections);

  return (
    <div className={'jorneydiscovey'}>
      <NavigationBar name={task.title} rout={`/module/${task?.timeSlot?.module?.id}/task`} />
      <div className={'jorneydiscovey-body'}>
        {myData
          .sort((el1, el2) => {
            if (el1.orderNumber < el2.orderNumber) return -1;
            if (el1.orderNumber > el2.orderNumber) return 1;
            return 0;
          })
          .map((section) => (
            <SectionContent section={section} />
          ))}
        {/*<AnswerNotFound />*/}
      </div>
    </div>
  );
};

export default Task;
