import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../app/features/task-list';
import { Task } from '../app/shared/models';

describe('TaskList', () => {
  const mockToggleDone = jest.fn();
  const mockDeleteTask = jest.fn();

  const tasks: Task[] = [
    { id: '1', text: 'Сделать домашку', done: false },
    { id: '2', text: 'Постирать', done: true },
  ];

  const setup = () =>
    render(
      <TaskList
        listId='list-1'
        tasks={tasks}
        toggleDone={mockToggleDone}
        deleteTask={mockDeleteTask}
      />
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('рендерит все задачи', () => {
    setup();
    expect(screen.getByText('Сделать домашку')).toBeInTheDocument();
    expect(screen.getByText('Постирать')).toBeInTheDocument();
  });

  it('отображает выполненные задачи зачёркнутыми', () => {
    setup();
    const doneTask = screen.getByText('Постирать');
    expect(doneTask).toHaveClass('line-through');
  });

  it('вызывает toggleDone при клике на чекбокс', () => {
    setup();
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(mockToggleDone).toHaveBeenCalledWith('list-1', '1');
  });

  it('вызывает deleteTask при клике на кнопку Х', () => {
    setup();
    const buttons = screen.getAllByRole('button', { name: 'Х' });
    fireEvent.click(buttons[1]); // удаляем вторую задачу
    expect(mockDeleteTask).toHaveBeenCalledWith('list-1', '2');
  });
});
