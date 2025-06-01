import TaskList, { TaskListProps } from '../../features/task-list';
import TodoFilterPanel, {
  TodoFilterPanelProps,
} from '../../features/todo-filter-panel';
import { Task, TodoList } from '../../shared/models';
import cls from './todo-card.module.css';

/* В настоящем проекте функции-обработчики не прокидывались вниз, а
 * находились бы в store
 */
interface TodoCardProps {
  list?: TodoList;
  addTask: (listId: TodoList['id'], taskText: Task['text']) => void;
  clearCompleted: TodoFilterPanelProps['clearCompleted'];
  changeFilter: TodoFilterPanelProps['changeFilter'];
  deleteTask: TaskListProps['deleteTask'];
  toggleDone: TaskListProps['toggleDone'];
}

export function TodoCard({
  list,
  addTask,
  clearCompleted,
  changeFilter,
  deleteTask,
  toggleDone,
}: TodoCardProps) {
  if (!list) {
    return (
      <h2 className={'text-white text-center'}>
        Выбери или создай список задач
      </h2>
    );
  }
  const filteredTasks =
    list.filter === 'all'
      ? list.tasks
      : list.filter === 'active'
        ? list.tasks.filter((t) => !t.done)
        : list.tasks.filter((t) => t.done);

  return (
    <div className={cls.todoCard + ' flex flex-col gap-3'}>
      <input
        placeholder='Что будешь делать?'
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            addTask(list.id, e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
        className={'w-[500px]'}
      />
      <TodoFilterPanel
        list={list}
        clearCompleted={clearCompleted}
        changeFilter={changeFilter}
      />
      <TaskList
        listId={list.id}
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleDone={toggleDone}
      />
    </div>
  );
}
