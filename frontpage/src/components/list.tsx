import React, { useState, useEffect } from 'react';

// Define Todo status enum
export enum TodoStatus {
  NotStarted = 0,
  Ongoing = 1,
  Completed = 2
}

// Define Todo item interface
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
  
  // Fetch todos when component mounts or refreshTrigger changes
  useEffect(() => {
    // Make sure your API URL is correct - use the API URL from your development server
    fetch('http://localhost:5000/api/todo', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      })
      .then(response => console.log(response.ok))
      .catch(error => console.error(error));
      
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
  }, [refreshTrigger, setError]);
  
  // Simple status display text
  const getStatusText = (status: TodoStatus): string => {
    return ['Not Started', 'Ongoing', 'Completed'][status] || 'Unknown';
  };
  
  if (isLoading) {
    return <p>Loading todos...</p>;
  }
  
  return (
    <div className="todo-list">
      <h2 className="title is-4">Todo List</h2>
      
      {todos.length === 0 ? (
        <p>No todos found</p>
      ) : (
        <div>
          {todos.map(todo => (
            <div key={todo.id} className="box mb-3">
              <h3 className="title is-5">{todo.title}</h3>
              {todo.description && <p>{todo.description}</p>}
              <span className="tag">
                {getStatusText(todo.status)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;