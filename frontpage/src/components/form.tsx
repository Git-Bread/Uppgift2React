import React, { useState } from 'react';

interface FormProps {
  onRefresh: () => void;
  setError: (error: string | null) => void;
}

const Form: React.FC<FormProps> = ({ onRefresh, setError }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create new todo object
    const newTodo = {
      title,
      description
      // status will use default value from the API
    };

    // Send POST request to create the todo
    fetch('http://localhost:5000/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create todo');
      }
      return response.json();
    })
    .then(data => {
      console.log('Successfully created todo:', data);
      
      // Reset form
      setTitle('');
      setDescription('');
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Trigger refresh of the list
      onRefresh();
    })
    .catch(err => {
      console.error('Error creating todo:', err.message);
      setError(`Failed to create todo: ${err.message}`);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="box">
      <h2 className="title is-4">Add New Todo</h2>
      
      {showSuccess && (
        <div className="notification is-success is-light">
          <button className="delete" onClick={() => setShowSuccess(false)}></button>
          Todo created successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input 
              className="input" 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              required
            />
          </div>
        </div>
        
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea 
              className="textarea" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about this task..."
            />
          </div>
        </div>
        
        <div className="field">
          <div className="control">
            <button 
              className={`button is-primary ${isSubmitting ? 'is-loading' : ''}`} 
              type="submit"
              disabled={isSubmitting || !title.trim()}
            >
              Add Todo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;