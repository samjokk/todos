import { memo } from 'react';
import TaskList, { TaskListProps } from '../../features/task-list';
import TodoFilterPanel, {
  TaskFilterPanelProps,
} from '../../features/task-filter-panel';
import { Task, TodoList } from '../../shared/models';
import cls from './todo-card.module.css';

/* В настоящем проекте функции-обработчики не прокидывались вниз, а
 * находились бы в store
 */
interface TodoCardProps {
  list?: TodoList;
  addTask: (listId: TodoList['id'], taskText: Task['text']) => void;
  clearCompleted: TaskFilterPanelProps['clearCompleted'];
  changeFilter: TaskFilterPanelProps['changeFilter'];
  deleteTask: TaskListProps['deleteTask'];
  toggleDone: TaskListProps['toggleDone'];
}

const TodoCard = memo(
  ({
    list,
    addTask,
    clearCompleted,
    changeFilter,
    deleteTask,
    toggleDone,
  }: TodoCardProps) => {
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

    const addTodoTask = (textTask: string) => {
      addTask(list.id, textTask);
    };

    return (
      <div className={cls.todoCard + ' flex flex-col gap-3'}>
        <input
          placeholder='Что будешь делать?'
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              addTodoTask(e.currentTarget.value);
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
);

export default TodoCard;
