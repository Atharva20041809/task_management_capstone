const prisma = require('../lib/prisma');

// Factory Pattern: Encapsulates the object creation logic.
// This ensures that all task objects follow the same structure and validation.
const createTaskObject = (data) => {
  return {
    title: data.title,
    description: data.description || '',
    status: data.status || 'Todo',
    dueDate: data.dueDate ? new Date(data.dueDate) : null,
    userId: data.userId,
  };
};

// Single Responsibility Principle (SRP): This controller is only responsible 
// for Task CRUD operations, separating it from Auth or Route logic.

// Create Task
exports.createTask = async (req, res) => {
  try {
    // Encapsulation: Creating the task object using the factory
    const taskData = createTaskObject({ ...req.body, userId: req.userId });
    
    const task = await prisma.task.create({
      data: taskData,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

// Get All Tasks for User
exports.getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.userId },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id },
    });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};
