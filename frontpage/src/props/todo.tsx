import React from 'react';

interface TodoItemProps {
    id: number;
    text: string;
    completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed }) => {
    return (
        <li className="mb-3 box">
            <div className="level is-mobile">
                <div className="level-left">
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            checked={completed}
                            readOnly
                            //onChange={() => onToggle(id)}
                            className="mr-2"
                        />
                        <span className={completed ? "has-text-grey-light" : ""} 
                                style={{ textDecoration: completed ? 'line-through' : 'none' }}>
                            {text}
                        </span>
                    </label>
                </div>
                <div className="level-right">
                    <button 
                        className="button is-small is-danger is-light"
                        //onClick={() => onDelete(id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </li>
    );
};

export default TodoItem;