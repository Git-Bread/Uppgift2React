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
  const [validationError, setValidationError] = useState<string | null>(null);

  //Custom validation constants, wooooo
  const MIN_TITLE_LENGTH = 3;
  const MAX_DESCRIPTION_LENGTH = 200;

  //title change with validation
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setValidationError(null); //clear any previous validation errors
  };

  //Description change with validation
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    if (newDescription.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(newDescription);
      setValidationError(null);
    } else {
      setValidationError(`Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    //Validate form before submission
    if (title.trim().length < MIN_TITLE_LENGTH) {
      setValidationError(`Title must be at least ${MIN_TITLE_LENGTH} characters`);
      return;
    }
    
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      setValidationError(`Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`);
      return;
    }
    
    setValidationError(null);
    setIsSubmitting(true);
    
    //Create new todo object
    const newTodo = {
      title: title.trim(),
      description: description.trim()
    };

    //POST request to create the todo
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
        return response.json().then(errorData => {
          throw { errors: errorData.errors || 'Unknown error' };
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('Successfully created todo:', data);
      
      // Reset
      setTitle('');
      setDescription('');
      
      // Nice verification
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      onRefresh();
    })
    .catch(err => {
      console.error('Error creating todo:', err);
      setError(`Failed to create todo: ${err.errors || err.message}`);
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
          <p>Todo created successfully!</p>
        </div>
      )}
      
      {validationError && (
        <div className="notification is-warning is-light">
          <button className="delete" onClick={() => setValidationError(null)}></button>
          <p>{validationError}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Title <span className="has-text-grey-light is-size-7">(min. {MIN_TITLE_LENGTH} characters)</span></label>
          <div className="control">
            <input className={`input ${title.length > 0 && title.length < MIN_TITLE_LENGTH ? 'is-danger' : ''}`} type="text" value={title} onChange={handleTitleChange} 
              placeholder="What needs to be done?" required minLength={MIN_TITLE_LENGTH}/>
          </div>
          {title.length > 0 && title.length < MIN_TITLE_LENGTH && (
            <p className="help is-danger">Title must be at least {MIN_TITLE_LENGTH} characters</p>
          )}
        </div>
        
        <div className="field">
          <label className="label">Description 
            <span className="has-text-grey-light is-size-7 ml-1">
              ({description.length}/{MAX_DESCRIPTION_LENGTH} characters)
            </span>
          </label>
          <div className="control">
            <textarea className={`textarea ${description.length > MAX_DESCRIPTION_LENGTH ? 'is-danger' : ''}`} value={description} 
              onChange={handleDescriptionChange} placeholder="Add details about this task..." maxLength={MAX_DESCRIPTION_LENGTH}/>
          </div>
          {description.length > MAX_DESCRIPTION_LENGTH && (
            <p className="help is-danger">Description must be {MAX_DESCRIPTION_LENGTH} characters or less</p>
          )}
        </div>
        
        <div className="field">
          <div className="control">
            <button className={`button is-primary ${isSubmitting ? 'is-loading' : ''}`} type="submit" 
              disabled={isSubmitting || !title.trim() || title.length < MIN_TITLE_LENGTH || description.length > MAX_DESCRIPTION_LENGTH}>
              Add Todo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;