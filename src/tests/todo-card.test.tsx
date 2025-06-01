import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoCard from '../app/entities/todo-card/todo-card';
import { TodoList } from '../app/shared/models';

describe('TodoCard', () => {
  const baseList: TodoList = {
    id: 'list-1',
    name: 'Test List',
    filter: 'all',
    tasks: [
      { id: 'task-1', text: 'First Task', done: false },
      { id: 'task-2', text: 'Second Task', done: true },
    ],
  };

  const defaultProps = {
    addTask: jest.fn(),
    clearCompleted: jest.fn(),
    changeFilter: jest.fn(),
    deleteTask: jest.fn(),
    toggleDone: jest.fn(),
  };

  it('renders placeholder if no list is provided', () => {
    render(<TodoCard {...defaultProps} list={undefined} />);
    expect(
      screen.getByText(/Выбери или создай список задач/i)
    ).toBeInTheDocument();
  });

  it('renders tasks and allows adding a new task', async () => {
    render(<TodoCard {...defaultProps} list={baseList} />);
    const input = screen.getByPlaceholderText(/что будешь делать/i);
    await userEvent.type(input, 'New Task{enter}');
    expect(defaultProps.addTask).toHaveBeenCalledWith('list-1', 'New Task');
  });

  it('respects active filter and shows only active tasks', () => {
    const activeList = { ...baseList, filter: 'active' } as TodoList;
    render(<TodoCard {...defaultProps} list={activeList} />);
    expect(screen.getByText('First Task')).toBeInTheDocument();
    expect(screen.queryByText('Second Task')).not.toBeInTheDocument();
  });

  it('respects completed filter and shows only completed tasks', () => {
    const completedList = { ...baseList, filter: 'completed' } as TodoList;
    render(<TodoCard {...defaultProps} list={completedList} />);
    expect(screen.queryByText('First Task')).not.toBeInTheDocument();
    expect(screen.getByText('Second Task')).toBeInTheDocument();
  });
});
