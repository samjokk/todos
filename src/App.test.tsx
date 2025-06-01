import { render, screen } from '@testing-library/react';
import App from './App';

test('рендерит заголовок и страницу задач', () => {
  render(<App />);

  // Проверяем заголовок
  const heading = screen.getByRole('heading', { name: /TODOS/i });
  expect(heading).toBeInTheDocument();

  // Проверим наличие поля ввода для создания списка (часть TodoPage)
  const input = screen.getByPlaceholderText(/название todo-списка/i);
  expect(input).toBeInTheDocument();
});
