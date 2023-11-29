import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPage, InferGetServerSidePropsType } from 'next';
import { Layout } from '../components/Layout';
import { supabase } from '../utils/supabase';

export const getServerSideProps = async () => {
  console.log('getServerSideProps/ssr invoked');
  const { data: tasks } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true });

  const { data: notices } = await supabase
    .from('noteces')
    .select('*')
    .order('created_at', { ascending: true });

  return {
    props: {
      tasks,
      notices,
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Ssr: NextPage<Props> = ({ notices, tasks }) => {
  const router = useRouter();
  return (
    <Layout title="SSR">
      <p className="mb-3 text-blue-500">SSR</p>

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
      <Link href={'/ssg'} prefetch={false}>
        <span className="my-3 text-xs">Link to SSG</span>
      </Link>
      <Link href={'/isr'} prefetch={false}>
        <span className="mb-3 text-xs">Link to ISR</span>
      </Link>
      <button className="mb-3 text-xs" onClick={() => router.push('/ssg')}>
        Route to ssg
      </button>
      <button className="mb-3 text-xs" onClick={() => router.push('isr')}>
        Route to isr
      </button>
    </Layout>
  );
};

export default Ssr;
