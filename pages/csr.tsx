import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { supabase } from '../utils/supabase';
import { Task, Notice } from '../types/types';

const Csr: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [notices, setNotices] = useState<Notice[]>();

  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: true });
      if (!tasks) return;
      setTasks(tasks);
    };
    const getNotice = async () => {
      const { data: notices } = await supabase
        .from('noteces')
        .select('*')
        .order('created_at', { ascending: true });
      if (!notices) return;
      setNotices(notices);
    };
    getTasks();
    getNotice();
  }, []);

  return (
    <Layout title="CSR">
      <p className="mb-3 text-blue-500">SSG + CSF</p>
      <ul className="mb-3">
        {tasks?.map((task) => (
          <li key={task.id}>
            <p className="text-lg font-extrabold">{task.title}</p>
          </li>
        ))}
      </ul>

      <ul className="mb-3">
        {notices?.map((notice) => (
          <li key={notice.id}>
            <p className="text-lg font-extrabold">{notice.content}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Csr;
