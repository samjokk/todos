import cls from './App.module.css';
import TodoPage from './app/features/todo-page';

function App() {
  return (
    <div className={cls.App}>
      <h1 className={cls.AppHeader}>TODOS</h1>
      <TodoPage />
    </div>
  );
}

export default App;
