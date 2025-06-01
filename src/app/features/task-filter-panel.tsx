import { TodoFilter, TodoList } from '../shared/models';
import { Button } from '../ui/button';

export interface TaskFilterPanelProps {
  list: TodoList;
  clearCompleted: (listId: string) => void;
  changeFilter: (listId: string, todoFilter: TodoFilter) => void;
}

const TaskFilterPanel = ({
  list,
  clearCompleted,
  changeFilter,
}: TaskFilterPanelProps) => {
  return (
    <div className='flex gap-2 text-sm'>
      <Button
        variant={list.filter === 'all' ? 'default' : 'outline'}
        onClick={() => changeFilter(list.id, 'all')}
      >
        Все
      </Button>
      <Button
        variant={list.filter === 'active' ? 'default' : 'outline'}
        onClick={() => changeFilter(list.id, 'active')}
      >
        Активные
      </Button>
      <Button
        variant={list.filter === 'completed' ? 'default' : 'outline'}
        onClick={() => changeFilter(list.id, 'completed')}
      >
        Завершённые
      </Button>
      <Button variant='dangerous' onClick={() => clearCompleted(list.id)}>
        Очистить завершённые
      </Button>
    </div>
  );
};

export default TaskFilterPanel;
