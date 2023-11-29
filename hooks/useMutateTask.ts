import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../utils/supabase';
import { EditedTask, Task } from '../types/types';
import useStore from '../store';

export const useMutateTask = () => {
  const queryClient = useQueryClient();
  const reset = useStore((state) => state.resetEditedTask);

  const createTaskMutation = useMutation(
    async (task: Omit<Task, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('todos')
        .insert(task)
        .select();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>(['todos']);
        if (previousTodos) {
          queryClient.setQueriesData(['todos'], [...previousTodos, res[0]]);
        }
        reset();
      },
      onError: (err: any) => {
        alert((err as Error).message);
        reset();
      },
    }
  );

  const updateTaskMutation = useMutation(
    async (task: EditedTask) => {
      const { data, error } = await supabase
        .from('todos')
        .update(task)
        .eq('id', task.id)
        .select();
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>(['todos']);
        if (previousTodos) {
          queryClient.setQueryData(
            ['todos'],
            previousTodos.map((task) =>
              task.id === variables.id ? res[0] : task
            )
          );
        }
        reset();
      },
      onError: (err: any) => {
        alert((err as Error).message);
        reset();
      },
    }
  );

  const deleteTaskMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .select();
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (_, variables) => {
        const previosTodos = queryClient.getQueryData<Task[]>(['todos']);
        if (previosTodos) {
          queryClient.setQueryData(
            ['todos'],
            previosTodos.filter((task) => task.id !== variables)
          );
        }
        reset();
      },
      onError: (err: any) => {
        alert((err as Error).message);
        reset();
      },
    }
  );
};
