import React from 'react';
import { NextPage } from 'next';
import { supabase } from '../utils/supabase';
import { Layout } from '../components/Layout';
import { LogoutIcon } from '@heroicons/react/solid';

const Dashboard: NextPage = () => {
  const signout = () => {
    supabase.auth.signOut();
  };
  return (
    <Layout title="dashboard">
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signout}
      />
    </Layout>
  );
};

export default Dashboard;
