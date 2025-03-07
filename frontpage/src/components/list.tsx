import React, { useState, useEffect } from 'react';
import TodoItem from '../props/todo';

// Define Todo status enum
export enum TodoStatus {
  NotStarted = 0,
  Ongoing = 1,
  Completed = 2
}

interface TodoItem {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  createdAt: string;
}

interface ListProps {
  setError: (error: string | null) => void;
  refreshTrigger?: number;
}

const List: React.FC<ListProps> = ({ setError, refreshTrigger }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<number>(0);
  
  const handleRefresh = () => {
    setRefresh(prev => prev + 1); // Trigger a re-fetch
  };
  
  useEffect(() => {
    fetch('http://localhost:5000/api/todo', {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        return response.json();
    })
    .then(data => {
      setTodos(data.data || []);
      setIsLoading(false);
    })
    .catch(err => {
      console.error(err);
      setError('Could not load todos: ' + err.message);
      setIsLoading(false);
    });
  }, [refreshTrigger, refresh, setError]);
  
  if (isLoading) {
    return <p>Loading todos...</p>;
  }
  
  return (
    <div className="todo-list">
      <h2 className="title is-4">Todo List</h2>
      
      {todos.length === 0 ? (
        <p>No todos found</p>
      ) : (
        <ul style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description || 'No description'}
              completed={todo.status === TodoStatus.Completed}
              status={todo.status}
              onRefresh={handleRefresh}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;