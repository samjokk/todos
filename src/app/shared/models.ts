export interface Task {
  id: string;
  text: string;
  done: boolean;
}

export interface TodoList {
  id: string;
  name: string;
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
}

export type TodoFilter = 'all' | 'active' | 'completed';
