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

interface APIError {
  status: number;
  errors: string;
  title: string;
}

interface ListProps {
  setError: (error: string | null) => void;
  refreshTrigger?: number;
}

const List: React.FC<ListProps> = ({ setError, refreshTrigger }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<number>(0);
  const [apiErrorDetails, setApiErrorDetails] = useState<APIError | null>(null);
  
  const handleRefresh = () => {
    setRefresh(prev => prev + 1); // Trigger a re-fetch
    setApiErrorDetails(null); // Clear previous errors on refresh
  };
  
  useEffect(() => {
    setIsLoading(true);
    setApiErrorDetails(null);
    
    fetch('http://localhost:5000/api/todo', {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw { 
            status: response.status,
            errors: errorData.errors || 'Unknown error',
            title: errorData.title || 'API Error'
          };
        });
      }
      return response.json();
    })
    .then(data => {
      setTodos(data.data || []);
      setIsLoading(false);
    })
    .catch(err => {
      console.error('API Error:', err);
      if (err.status && err.errors) {
        // This is a structured API error
        setApiErrorDetails(err);
        setError(`${err.title} (${err.status}): ${err.errors}`);
      } else {
        // This is a network or other error
        setError(`Connection Error: ${err.errors || 'Failed to connect to the server'}`);
      }
      setIsLoading(false);
    });
  }, [refreshTrigger, refresh, setError]);
  
  if (isLoading) {
    return (
      <div className="box">
        <progress className="progress is-primary" max="100">Loading...</progress>
        <p className="has-text-centered">Loading todos...</p>
      </div>
    );
  }
  
  return (
    <div className="todo-list">
      <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
        <h2 className="title is-4 mb-0">Todo List</h2>
        <button 
          className="button is-small is-light" 
          onClick={handleRefresh}
          title="Refresh list"
        >
          <span className="icon">↻</span>
        </button>
      </div>
      
      {apiErrorDetails && (
        <div className="notification is-danger">
          <button className="delete" onClick={() => setApiErrorDetails(null)}></button>
          <p className="mb-2"><strong>{apiErrorDetails.title} (Status: {apiErrorDetails.status})</strong></p>
          <p>{apiErrorDetails.errors}</p>
          <p className="mt-2">
            <button 
              className="button is-small is-white is-outlined" 
              onClick={handleRefresh}
            >
              Try again
            </button>
          </p>
        </div>
      )}
      
      {/* No Response, Or Response */}
      {!apiErrorDetails && todos.length === 0 ? (
        <div className="notification is-info is-light">
          <p>No todos found. Create a new one!</p>
        </div>
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