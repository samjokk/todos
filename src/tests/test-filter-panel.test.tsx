import { render, screen, fireEvent } from '@testing-library/react';
import TaskFilterPanel, {
  TaskFilterPanelProps,
} from '../app/features/task-filter-panel';
import { TodoList } from '../app/shared/models';

describe('TaskFilterPanel', () => {
  const baseList: TodoList = {
    id: 'list-1',
    name: 'My Todo List',
    tasks: [],
    filter: 'all',
  };

  const setup = (overrideProps?: Partial<TaskFilterPanelProps>) => {
    const props: TaskFilterPanelProps = {
      list: baseList,
      clearCompleted: jest.fn(),
      changeFilter: jest.fn(),
      ...overrideProps,
    };

    render(<TaskFilterPanel {...props} />);
    return props;
  };

  it('renders all four buttons with correct labels', () => {
    setup();
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);

    expect(buttons[0]).toHaveTextContent(/Все/i);
    expect(buttons[1]).toHaveTextContent(/Активные/i);
    expect(buttons[2]).toHaveTextContent(/Завершённые/i);
    expect(buttons[3]).toHaveTextContent(/Очистить завершённые/i);
  });

  it('applies correct variant to buttons based on current filter', () => {
    const { rerender } = render(
      <TaskFilterPanel
        list={{ ...baseList, filter: 'all' }}
        clearCompleted={jest.fn()}
        changeFilter={jest.fn()}
      />
    );

    let buttons = screen.getAllByRole('button');

    expect(buttons[0]).toHaveClass('default');
    expect(buttons[1]).toHaveClass('outline');
    expect(buttons[2]).toHaveClass('outline');

    rerender(
      <TaskFilterPanel
        list={{ ...baseList, filter: 'active' }}
        clearCompleted={jest.fn()}
        changeFilter={jest.fn()}
      />
    );

    buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('outline');
    expect(buttons[1]).toHaveClass('default');
    expect(buttons[2]).toHaveClass('outline');

    rerender(
      <TaskFilterPanel
        list={{ ...baseList, filter: 'completed' }}
        clearCompleted={jest.fn()}
        changeFilter={jest.fn()}
      />
    );

    buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('outline');
    expect(buttons[1]).toHaveClass('outline');
    expect(buttons[2]).toHaveClass('default');
  });

  it('calls changeFilter with correct arguments on filter button click', () => {
    const { changeFilter } = setup();

    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[0]);
    expect(changeFilter).toHaveBeenCalledWith(baseList.id, 'all');

    fireEvent.click(buttons[1]);
    expect(changeFilter).toHaveBeenCalledWith(baseList.id, 'active');

    fireEvent.click(buttons[2]);
    expect(changeFilter).toHaveBeenCalledWith(baseList.id, 'completed');
  });

  it('calls clearCompleted with correct list id on clear button click', () => {
    const { clearCompleted } = setup();

    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[3]);
    expect(clearCompleted).toHaveBeenCalledWith(baseList.id);
  });
});
