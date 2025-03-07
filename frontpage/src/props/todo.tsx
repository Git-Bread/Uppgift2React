import React, { useState } from 'react';
import { TodoStatus } from '../components/list';

interface TodoItemProps {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    status: TodoStatus;
    onRefresh?: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, description, status, onRefresh }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editTitle, setEditTitle] = useState<string>(title);
    const [editDescription, setEditDescription] = useState<string>(description);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //clear error on any state change
    const clearError = () => {
        setError(null);
    };

    //delete the todo
    const onDelete = (id: number): void => {
        clearError();
        setIsLoading(true);
        fetch(`http://localhost:5000/api/todo/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.title || 'Failed to delete todo');
                });
            }
            console.log(`Successfully deleted todo with id: ${id}`);
            if (onRefresh) onRefresh();
        })
        .catch(err => {
            console.error(`Error deleting todo:`, err);
            setError(`Delete failed: ${err.message}`);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    //change mode
    const onToggle = (id: number): void => {
        clearError();
        setIsLoading(true);
        fetch(`http://localhost:5000/api/todo/${id}/change-status`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.title || 'Failed to update todo status');
                });
            }
            if (onRefresh) onRefresh();
            return response.json();
        })
        .catch(err => {
            console.error(`Error updating todo status:`, err);
            setError(`Status update failed: ${err.message}`);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    //set edit view
    const onEdit = (): void => {
        clearError();
        setEditTitle(title);
        setEditDescription(description);
        setIsEditing(true);
    };

    //update the todo
    const onSave = (): void => {
        clearError();
        setIsLoading(true);
        
        const updatedTodo = {
            title: editTitle,
            description: editDescription,
            status: status
        };

        //PUT request to update the todo
        fetch(`http://localhost:5000/api/todo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updatedTodo)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.title || 'Failed to update todo');
                });
            }
            console.log(`Successfully updated todo with id: ${id}`);
            setIsEditing(false); //Exit edit mode
            if (onRefresh) onRefresh();
        })
        .catch(err => {
            console.error(`Error updating todo:`, err);
            setError(`Update failed: ${err.message}`);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    //get the status text
    const getStatusText = () => {
        switch(status) {
            case TodoStatus.Completed:
                return 'completed';
            case TodoStatus.Ongoing:
                return 'ongoing';
            case TodoStatus.NotStarted:
            default:
                return 'not started';
        }
    };

    //text color based of status
    const getStatusStyle = () => {
        switch(status) {
            case TodoStatus.Completed:
                return "has-text-success";
            case TodoStatus.Ongoing:
                return "has-text-info";
            case TodoStatus.NotStarted:
            default:
                return "has-text-grey";
        }
    };

    //edit mode/view
    if (isEditing) {
        return (
            <li className="mb-4">
                <div className="box p-4">
                    {/* Error notification */}
                    {error && (
                        <div className="notification is-danger is-light mb-3">
                            <button className="delete" onClick={clearError}></button>
                            {error}
                        </div>
                    )}
                    
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input className="input" type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}/>
                        </div>
                    </div>
                    
                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <textarea className="textarea" value={editDescription} onChange={(e) => setEditDescription(e.target.value)}/>
                        </div>
                    </div>
                    
                    <div className="field is-grouped">
                        <div className="control">
                            <button className={`button is-small is-success ${isLoading ? 'is-loading' : ''}`} onClick={onSave} disabled={isLoading || !editTitle.trim()}>Save</button>
                        </div>
                        <div className="control">
                            <button className="button is-small" onClick={() => {clearError(); setIsEditing(false);}} disabled={isLoading}>Cancel</button>
                        </div>
                    </div>
                </div>
            </li>
        );
    }

    return (
        <li className="mb-4">
            <div className="box p-4">
                {/* Error notification */}
                {error && (
                    <div className="notification is-danger is-light mb-3">
                        <button className="delete" onClick={clearError}></button>
                        {error}
                    </div>
                )}
                
                <div className="columns is-mobile is-vcentered is-hidden-mobile">
                    <div className="column">
                        <h4 className={`title is-5 ${status === TodoStatus.Completed ? "has-text-grey-light" : ""}`}
                            style={{ textDecoration: status === TodoStatus.Completed ? 'line-through' : 'none' }}>
                            {title}
                        </h4>
                        <p className="subtitle is-6">{description}</p>
                    </div>

                    {/* Status checkbox (non-mobile) */}
                    <div className="column is-narrow">
                        <label className="checkbox">
                            <span className={`${getStatusStyle()} is-size-7`}>{getStatusText()}</span>
                            <input 
                                type="checkbox" 
                                checked={status === TodoStatus.Completed} 
                                onChange={() => onToggle(id)} 
                                disabled={isLoading}
                                className="ml-2"
                                style={{
                                    opacity: status === TodoStatus.NotStarted ? 0.5 : 1,
                                    accentColor: status === TodoStatus.Completed ? 'green' : 'blue'
                                }}
                            />
                        </label>
                    </div>
                </div>
                
                {/* Mobile view - Stacked layout */}
                <div className="is-hidden-tablet">
                    <div className="mb-3">
                        <h4 className={`title is-5 ${status === TodoStatus.Completed ? "has-text-grey-light" : ""}`}
                            style={{ textDecoration: status === TodoStatus.Completed ? 'line-through' : 'none' }}>
                            {title}
                        </h4>
                        <h5 className="subtitle is-6">{description}</h5>
                    </div>
                </div>
                
                {/* buttons and status (mobile and desktop) */}
                <div className="columns is-mobile mt-3">
                    <div className="column is-8">
                        <div className="buttons">
                            <button 
                                className={`button is-small is-info is-light ${isLoading ? 'is-loading' : ''}`} 
                                onClick={() => onEdit()}
                                disabled={isLoading}
                            >
                                <span>Edit</span>
                            </button>
                            <button 
                                className={`button is-small is-danger is-light ${isLoading ? 'is-loading' : ''}`} 
                                onClick={() => onDelete(id)}
                                disabled={isLoading}
                            >
                                <span>Remove</span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Status checkbox (mobile only) */}
                    <div className="column is-4 has-text-right is-hidden-tablet">
                        <label className="checkbox mr-2">
                            <span className={`${getStatusStyle()} is-size-7`}>
                                {getStatusText()}
                            </span>
                            <input 
                                type="checkbox" 
                                checked={status === TodoStatus.Completed}
                                onChange={() => onToggle(id)} 
                                disabled={isLoading}
                                className="ml-1"
                                style={{
                                    opacity: status === TodoStatus.NotStarted ? 0.5 : 1,
                                    accentColor: status === TodoStatus.Completed ? 'green' : 'blue'
                                }}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default TodoItem;