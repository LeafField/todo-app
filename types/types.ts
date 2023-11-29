export type Task = {
  created_at: string;
  id: string;
  title: string | null;
  user_id: string | null;
};

export type Notice = {
  content: string | null;
  created_at: string;
  id: string;
  user_id: string | null;
};

export type EditedTask = Omit<Task, 'created_at' | 'user_id'>;
export type EditedNotice = Omit<Notice, 'created_at' | 'user_id'>;
