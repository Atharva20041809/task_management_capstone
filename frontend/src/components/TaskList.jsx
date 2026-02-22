import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
    return (
        <div className="task-list">
            {tasks.length === 0 ? (
                <p>No tasks found. Add one!</p>
            ) : (
                tasks.map((task) => (
                    <div key={task.id} className="task-item">
                        <div className="task-info">
                            <h4 className={task.status === 'Completed' ? 'task-completed' : ''}>{task.title}</h4>
                            <p>{task.description}</p>
                            <span className={`status-badge status-${task.status.toLowerCase().replace(' ', '')}`}>
                                {task.status}
                            </span>
                            {task.dueDate && <p><small>Due: {new Date(task.dueDate).toLocaleDateString()}</small></p>}
                        </div>
                        <div className="task-actions">
                            <button className="btn-edit" onClick={() => onEdit(task)}>Edit</button>
                            <button className="btn-delete" onClick={() => onDelete(task.id)}>Delete</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TaskList;
