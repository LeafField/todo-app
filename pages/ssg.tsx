import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPage, InferGetStaticPropsType } from 'next';
import { Layout } from '../components/Layout';
import { supabase } from '../utils/supabase';

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
  const router = useRouter();
  return (
    <Layout title="SSG">
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
      <Link href={'/ssr'} prefetch={false}>
        <span className="my-3 text-xs">Link to SSR</span>
      </Link>
      <button className="mb-3 text-xs" onClick={() => router.push('/ssr')}>
        Route to SSR
      </button>
    </Layout>
  );
};

export default Ssg;
