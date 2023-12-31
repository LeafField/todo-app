import React from 'react';
import { NextPage } from 'next';
import { useQueryClient } from 'react-query';
import { supabase } from '../utils/supabase';
import { Layout } from '../components/Layout';
import {
  LogoutIcon,
  StatusOnlineIcon,
  DocumentTextIcon,
} from '@heroicons/react/solid';
import { TaskList } from '../components/TaskList';
import { TaskForm } from '../components/TaskForm';
import { NoticeForm } from '../components/NoticeForm';
import { NoticeList } from '../components/NoticeList';

const Dashboard: NextPage = () => {
  const queryClient = useQueryClient();

  const signout = () => {
    supabase.auth.signOut();
    queryClient.removeQueries(['todos']);
    queryClient.removeQueries(['notices']);
  };

  return (
    <Layout title="dashboard">
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signout}
      />
      <div className="grid grid-cols-2 gap-40">
        <div>
          <div className="my-3 flex justify-center">
            <DocumentTextIcon className="h-8 w-8 text-blue-500" />
          </div>
          <TaskForm />
          <TaskList />
        </div>
        <div>
          <div className="my-3 flex justify-center">
            <StatusOnlineIcon className="h-8 w-8 text-blue-500" />
          </div>
          <NoticeForm />
          <NoticeList />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
