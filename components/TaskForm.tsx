import React, { FC, FormEvent } from 'react';
import { supabase } from '../utils/supabase';
import useStore from '../store';
import { useMutateTask } from '../hooks/useMutateTask';

export const TaskForm: FC = () => {
  const { editedTask } = useStore();
  const update = useStore((state) => state.updateEditedTask);
  const { createTaskMutation, updateTaskMutation } = useMutateTask();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editedTask.id === '') {
      const { data } = await supabase.auth.getUser();
      createTaskMutation.mutate({
        title: editedTask.title,
        user_id: data.user ? data.user.id : '',
      });
    } else {
      updateTaskMutation.mutate({
        id: editedTask.id,
        title: editedTask.title,
      });
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="New Task ?"
        value={editedTask.title ? editedTask.title : ''}
        onChange={(e) => update({ ...editedTask, title: e.target.value })}
      />
      <button
        type="submit"
        className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
      >
        {editedTask.id ? 'Update' : 'Create'}
      </button>
    </form>
  );
};
