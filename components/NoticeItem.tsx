import React, { FC, useState, useEffect, useCallback } from 'react';
import { supabase } from '../utils/supabase';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import useStore from '../store';
import { useMutateNotice } from '../hooks/useMutateNotice';
import { Notice } from '../types/types';

type Props = Omit<Notice, 'created_at'>;

export const NoticeItem: FC<Props> = ({ content, id, user_id }) => {
  const [userId, setUserId] = useState<string | undefined>('');
  const update = useStore((state) => state.updateEditedNotice);
  const { deleteNoticeMutations } = useMutateNotice();

  const getUser = useCallback(async () => {
    const { data: auth } = await supabase.auth.getUser();
    setUserId(auth.user?.id);
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <li className="my-3 text-lg font-extrabold">
      <span>{content}</span>
      {userId === user_id && (
        <div className="float-right ml-20 flex">
          <PencilAltIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              update({ id, content });
            }}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => deleteNoticeMutations.mutate(id)}
          />
        </div>
      )}
    </li>
  );
};
