import { supabase } from '../utils/supabase';
import { useQueryClient, useMutation } from 'react-query';
import useStore from '../store';
import { Notice, EditedNotice } from '../types/types';

export const useMutateNotice = () => {
  const queryClient = useQueryClient();
  const reset = useStore((store) => store.resetEditedNotice);

  const createNoticeMutation = useMutation(
    async (notice: Omit<Notice, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('noteces')
        .insert(notice)
        .select();
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res) => {
        const previosNotice = queryClient.getQueryData<Notice[]>(['notices']);
        if (previosNotice) {
          queryClient.setQueryData(['notices'], [...previosNotice, res[0]]);
        }
        reset();
      },
      onError: (err: any) => {
        alert((err as Error).message);
        reset();
      },
    }
  );

  const updateNoticeMutation = useMutation(
    async (notice: EditedNotice) => {
      const { data, error } = await supabase
        .from('noteces')
        .update(notice)
        .eq('id', notice.id)
        .select();
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (res, variables) => {
        const previosNotice = queryClient.getQueryData<Notice[]>(['notices']);
        if (previosNotice) {
          queryClient.setQueryData(
            ['notices'],
            previosNotice.map((notice) =>
              notice.id === variables.id ? res[0] : notice
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

  const deleteNoticeMutations = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('noteces')
        .delete()
        .eq('id', id)
        .select();
      if (error) throw new Error(error.message);
      return data;
    },
    {
      onSuccess: (_, variables) => {
        const previosNotice = queryClient.getQueryData<Notice[]>(['notices']);
        if (previosNotice) {
          queryClient.setQueryData(
            ['notices'],
            previosNotice.filter((notice) => notice.id !== variables)
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

  return { createNoticeMutation, deleteNoticeMutations, updateNoticeMutation };
};
