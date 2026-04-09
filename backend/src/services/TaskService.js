// services/TaskService.js
// Single Responsibility: handles only task business logic.

const TaskFactory = require('../factory/TaskFactory');
const prisma = require('../lib/prisma');

class TaskService {
  async createTask(data, userId) {
    // Delegate creation to factory — ensures consistent, validated task structure
    const taskData = TaskFactory.createTask(data, userId);
    return await prisma.task.create({ data: taskData });
  }

  async getTasks(userId) {
    // Ownership enforcement: always filter by userId
    return await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTaskById(id, userId) {
    const task = await prisma.task.findFirst({ where: { id, userId } });
    if (!task) {
      const err = new Error('Task not found.');
      err.statusCode = 404;
      throw err;
    }
    return task;
  }

  async updateTask(id, userId, data) {
    // Verify ownership before update
    await this.getTaskById(id, userId);

    const { title, description, status, priority, dueDate } = data;

    const validStatuses = ['TODO', 'IN_PROGRESS', 'COMPLETED'];
    const validPriorities = ['LOW', 'MEDIUM', 'HIGH'];

    const updateData = {};
    if (title !== undefined)       updateData.title       = title.trim();
    if (description !== undefined) updateData.description = description ? description.trim() : null;
    if (status !== undefined) {
      if (!validStatuses.includes(status)) {
        const err = new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        err.statusCode = 400;
        throw err;
      }
      updateData.status = status;
    }
    if (priority !== undefined) {
      if (!validPriorities.includes(priority)) {
        const err = new Error(`Invalid priority. Must be one of: ${validPriorities.join(', ')}`);
        err.statusCode = 400;
        throw err;
      }
      updateData.priority = priority;
    }
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;

    return await prisma.task.update({ where: { id }, data: updateData });
  }

  async deleteTask(id, userId) {
    // Verify ownership before deletion
    await this.getTaskById(id, userId);
    await prisma.task.delete({ where: { id } });
    return { message: 'Task deleted successfully.' };
  }
}

module.exports = new TaskService();
