import React from 'react';
import { TodoStatus } from '../components/list';

interface TodoItemProps {
    id: number;
    text: string;
    completed: boolean;
    status: TodoStatus;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, status }) => {
    const onDelete = (id: number): void => {
        console.log(`Deleting todo with id: ${id}`);
    };

    const onToggle = (id: number): void => {
        console.log(`Toggling completion status of todo with id: ${id}`);
    };

    const onEdit = (id: number): void => {
        console.log(`Editing todo with id: ${id}`);
    };

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

    // Get appropriate color style based on status
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

    return (
        <li className="mb-4">
            <div className="box p-4">
                <div className="columns is-mobile is-vcentered mb-2">
                    <div className="column">
                        <p className={status === TodoStatus.Completed ? "has-text-grey-light" : ""} 
                           style={{ textDecoration: status === TodoStatus.Completed ? 'line-through' : 'none' }}>
                            {text}
                        </p>
                    </div>
                    <div className="column is-narrow">
                        <label className="checkbox">
                            <span className={`${getStatusStyle()}`}>
                                {getStatusText()}
                            </span>
                            <input 
                                type="checkbox" 
                                checked={status === TodoStatus.Completed}
                                onChange={() => onToggle(id)} 
                                className="ml-2"
                                style={{
                                    opacity: status === TodoStatus.NotStarted ? 0.5 : 1,
                                    accentColor: status === TodoStatus.Completed ? 'green' : 'blue'
                                }}
                            />
                        </label>
                    </div>
                </div>
                
                {/* Second row: Action buttons */}
                <div className="columns is-mobile">
                    <div className="column">
                        <div className="buttons is-left">
                            <button className="button is-small is-info is-light" onClick={() => onEdit(id)}>
                                <span>Edit</span>
                            </button>
                            <button className="button is-small is-danger is-light" onClick={() => onDelete(id)}>
                                <span>Remove</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default TodoItem;