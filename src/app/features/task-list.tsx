import { Task } from '../shared/models';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

export interface TaskListProps {
  tasks: Task[];
  listId: string;
  deleteTask: (listId: string, taskId: string) => void;
  toggleDone: (listId: string, taskId: string) => void;
}

export default function TaskList({
  listId,
  tasks,
  deleteTask,
  toggleDone,
}: TaskListProps) {
  return (
    <ul className='space-y-2'>
      {tasks.map((task) => (
        <li key={task.id} className='flex items-center gap-2'>
          <Checkbox
            checked={task.done}
            onCheckedChange={() => toggleDone(listId, task.id)}
          />
          <span
            className={task.done ? 'line-through text-muted-foreground' : ''}
          >
            {task.text}
          </span>
          <Button
            variant='dangerous'
            onClick={() => deleteTask(listId, task.id)}
          >
            Х
          </Button>
        </li>
      ))}
    </ul>
  );
}
