import { useQuery } from 'react-query';
import { supabase } from '../utils/supabase';
import { Notice } from '../types/types';

export const useQueryNotices = () => {
  const getNotices = async () => {
    const { data, error } = await supabase
      .from('noteces')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  return useQuery({
    queryKey: ['notices'],
    queryFn: getNotices,
    staleTime: Infinity,
    refetchOnWindowFocus: true,
  });
};
