import React, { useMemo, useState } from 'react';
import { Button } from '../ui/button';
import Tabs, { TabsContent } from '../entities/tabs';
import { TodoCard } from '../entities/todo-card/todo-card';
import { TodoFilter, TodoList } from '../shared/models';

const generateId = () => Math.random().toString(36).substring(2, 9);

export default function TodoPage() {
  const [lists, setLists] = useState<TodoList[]>([]);
  const [newListName, setNewListName] = useState('');

  const addList = () => {
    if (!newListName.trim()) return;
    setLists([
      ...lists,
      { id: generateId(), name: newListName.trim(), tasks: [], filter: 'all' },
    ]);
    setNewListName('');
  };

  const addTask = (listId: string, text: string) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: [...list.tasks, { id: generateId(), text, done: false }],
            }
          : list
      )
    );
  };

  const deleteTask = (listId: string, taskId: string) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
          : list
      )
    );
  };

  const toggleDone = (listId: string, taskId: string) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, done: !task.done } : task
              ),
            }
          : list
      )
    );
  };

  const changeFilter = (listId: string, filter: TodoFilter) => {
    setLists(
      lists.map((list) => (list.id === listId ? { ...list, filter } : list))
    );
  };

  const clearCompleted = (listId: string) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter((task) => !task.done) }
          : list
      )
    );
  };

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const selectedList = useMemo(
    () => lists.find((list) => list.id === selectedId),
    [selectedId]
  );

  return (
    <div className='w-[700px] p-6 max-w-4xl mx-auto space-y-4'>
      <div className='flex gap-2'>
        <input
          placeholder='Название TODO-списка'
          value={newListName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewListName(e.target.value)
          }
          className='flex-1'
        />
        <Button onClick={addList}>+</Button>
      </div>
      <Tabs
        lists={lists}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      ></Tabs>
      <TodoCard
        list={selectedList}
        addTask={addTask}
        clearCompleted={clearCompleted}
        changeFilter={changeFilter}
        deleteTask={deleteTask}
        toggleDone={toggleDone}
      />
    </div>
  );
}
