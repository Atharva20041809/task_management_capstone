import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, taskToEdit, clearEdit }) => {
    const [task, setTask] = useState({ title: '', description: '', status: 'Todo', dueDate: '' });

    useEffect(() => {
        if (taskToEdit) {
            setTask({
                title: taskToEdit.title,
                description: taskToEdit.description || '',
                status: taskToEdit.status,
                dueDate: taskToEdit.dueDate ? taskToEdit.dueDate.split('T')[0] : '',
            });
        } else {
            setTask({ title: '', description: '', status: 'Todo', dueDate: '' });
        }
    }, [taskToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(task);
        setTask({ title: '', description: '', status: 'Todo', dueDate: '' });
    };

    return (
        <div style={{ marginBottom: '2rem' }}>
            <h3>{taskToEdit ? 'Edit Task' : 'Create Task'}</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Title"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="Description"
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <select value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value })}>
                        <option value="Todo">Todo</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="date"
                        value={task.dueDate}
                        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                    />
                </div>
                <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
                {taskToEdit && (
                    <button type="button" onClick={clearEdit} className="btn-delete" style={{ marginTop: '0.5rem' }}>
                        Cancel Edit
                    </button>
                )}
            </form>
        </div>
    );
};

export default TaskForm;
