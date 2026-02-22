import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await taskService.getTasks();
            setTasks(data);
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleCreateOrUpdate = async (taskData) => {
        try {
            if (taskToEdit) {
                await taskService.updateTask(taskToEdit.id, taskData);
                setTaskToEdit(null);
            } else {
                await taskService.createTask(taskData);
            }
            fetchTasks();
        } catch (err) {
            console.error('Error saving task', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskService.deleteTask(id);
                fetchTasks();
            } catch (err) {
                console.error('Error deleting task', err);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <div>
            <nav>
                <span>Task Manager</span>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <div className="container">
                <h1>My Tasks</h1>
                <TaskForm
                    onSubmit={handleCreateOrUpdate}
                    taskToEdit={taskToEdit}
                    clearEdit={() => setTaskToEdit(null)}
                />
                <hr />
                <TaskList
                    tasks={tasks}
                    onEdit={setTaskToEdit}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default TasksPage;
