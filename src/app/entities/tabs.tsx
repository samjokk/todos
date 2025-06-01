import { memo, useMemo, useState } from 'react';
import { TodoList } from '../shared/models';

interface TabsProps {
  lists: TodoList[];
  setSelectedId: (id: TodoList['id']) => void;
  selectedId?: TodoList['id'];
  className?: string;
}

const Tabs = memo(
  ({ className, lists, selectedId, setSelectedId }: TabsProps) => {
    const choosedId = useMemo(() => {
      const id = selectedId ?? lists[lists.length - 1]?.id;
      setSelectedId(id);
      return id;
    }, [lists, selectedId]);

    return (
      <div className={className + ' flex flex-wrap gap-2 mb-4'}>
        {lists.map((list) => {
          const isActive = choosedId === list.id;
          return (
            <button
              key={list.id}
              className={`px-3 py-1 rounded text-nowrap ${
                isActive
                  ? 'bg-gray-600 hover:bg-gray-700 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
              }`}
              onClick={() => setSelectedId(list.id)}
            >
              {list.name} ({list.tasks.length})
            </button>
          );
        })}
      </div>
    );
  }
);

export default Tabs;
