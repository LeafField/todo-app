import React, { FC } from 'react';
import { useQueryTasks } from '../hooks/useQueryTasks';
import { Spinner } from './Spinner';
import { TaskItem } from './TaskItem';

export const TaskList: FC = () => {
  const { data: tasks, status } = useQueryTasks();
  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <p>{'Error'}</p>;
  return (
    <ul className="my-2">
      {tasks?.map((task) => (
        <TaskItem id={task.id} title={task.title} key={task.id} />
      ))}
    </ul>
  );
};
