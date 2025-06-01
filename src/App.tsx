import cls from "./App.module.css";
import TodoList from "./app/features/todo-list";

function App() {
  return (
    <div className={cls.App}>
      <h1 className={cls.AppHeader}>TODOS</h1>
      <TodoList />
    </div>
  );
}

export default App;
