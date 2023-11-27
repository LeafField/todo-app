import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPage, InferGetStaticPropsType } from 'next';
import { Layout } from '../components/Layout';
import { supabase } from '../utils/supabase';
import { Task, Notice } from '../types/types';

export const getStaticProps = async () => {
  console.log('getStaticProps/ssg invoke');

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

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Ssg: NextPage<Props> = ({ notices, tasks }) => {
  return (
    <Layout title="ssg">
      <p className="mb-3 text-blue-500">SSG</p>

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

export default Ssg;
