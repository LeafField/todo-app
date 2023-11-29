import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPage, InferGetStaticPropsType } from 'next';
import { Layout } from '../components/Layout';
import { supabase } from '../utils/supabase';

export const getStaticProps = async () => {
  console.log('getStaticProps/isr invoke');

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
    revalidate: 5,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Isr: NextPage<Props> = ({ notices, tasks }) => {
  const router = useRouter();
  return (
    <Layout title="ISR">
      <p className="mb-3 text-indigo-500">ISR</p>

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
      <Link href={'/ssr'} prefetch={false}>
        <span className="my-3 text-xs">Link to SSR</span>
      </Link>
      <button className="mb-3 text-xs" onClick={() => router.push('/ssr')}>
        Route to SSR
      </button>
      <Link href={'/ssr'} prefetch={false}>
        <span className="my-3 text-xs">Link to SSR</span>
      </Link>
      <button className="mb-3 text-xs" onClick={() => router.push('/ssr')}>
        Route to SSR
      </button>
    </Layout>
  );
};

export default Isr;
