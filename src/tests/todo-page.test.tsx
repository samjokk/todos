import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoPage from '../app/features/todo-page';

function setup() {
  render(<TodoPage />);
  const input = screen.getByPlaceholderText(/название todo/i);
  const addBtn = screen.getByRole('button', { name: '+' });
  return { input, addBtn };
}

describe('TodoPage', () => {
  it('добавляет новый список', async () => {
    const { input, addBtn } = setup();

    await userEvent.type(input, 'Дом');
    fireEvent.click(addBtn);

    expect(screen.getByRole('button', { name: /Дом/i })).toBeInTheDocument();
  });

  it('не добавляет пустой список', async () => {
    const { addBtn } = setup();

    fireEvent.click(addBtn);
    expect(
      screen.queryByRole('button', { name: /\(0\)/ })
    ).not.toBeInTheDocument();
  });

  it('добавляет задачу в выбранный список', async () => {
    const { input, addBtn } = setup();
    await userEvent.type(input, 'Работа');
    fireEvent.click(addBtn);

    const tab = screen.getByRole('button', { name: /Работа/i });
    fireEvent.click(tab);

    const taskInput = screen.getByPlaceholderText(/что будешь делать/i);
    await userEvent.type(taskInput, 'Сделать тест{enter}');

    expect(screen.getByText('Сделать тест')).toBeInTheDocument();
  });

  it('переключает фильтр задач', async () => {
    const { input, addBtn } = setup();
    await userEvent.type(input, 'Учёба');
    fireEvent.click(addBtn);

    const tab = screen.getByRole('button', { name: /Учёба/i });
    fireEvent.click(tab);

    const taskInput = screen.getByPlaceholderText(/что будешь делать/i);
    await userEvent.type(taskInput, 'Прочитать книгу{enter}');

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const completedBtns = screen.getAllByRole('button', {
      name: /завершённые/i,
    });
    fireEvent.click(completedBtns[0]);

    expect(screen.getByText('Прочитать книгу')).toBeInTheDocument();

    const activeBtns = screen.getAllByRole('button', { name: /активные/i });
    fireEvent.click(activeBtns[0]);

    expect(screen.queryByText('Прочитать книгу')).not.toBeInTheDocument();
  });

  it('удаляет выполненные задачи', async () => {
    const { input, addBtn } = setup();
    await userEvent.type(input, 'Дом');
    fireEvent.click(addBtn);

    const tab = screen.getByRole('button', { name: /Дом/i });
    fireEvent.click(tab);

    const taskInput = screen.getByPlaceholderText(/что будешь делать/i);
    await userEvent.type(taskInput, 'Пропылесосить{enter}');

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const clearBtn = screen.getByRole('button', {
      name: /очистить завершённые/i,
    });
    fireEvent.click(clearBtn);

    expect(screen.queryByText('Пропылесосить')).not.toBeInTheDocument();
  });
});
