// controllers/TaskController.js
// Single Responsibility: handles only HTTP request/response logic for tasks.

const TaskService = require('../services/TaskService');

class TaskController {
  async createTask(req, res, next) {
    try {
      const task = await TaskService.createTask(req.body, req.userId);
      res.status(201).json(task);
    } catch (err) {
      next(err);
    }
  }

  async getTasks(req, res, next) {
    try {
      const tasks = await TaskService.getTasks(req.userId);
      res.status(200).json(tasks);
    } catch (err) {
      next(err);
    }
  }

  async getTaskById(req, res, next) {
    try {
      const task = await TaskService.getTaskById(req.params.id, req.userId);
      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  }

  async updateTask(req, res, next) {
    try {
      const task = await TaskService.updateTask(req.params.id, req.userId, req.body);
      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const result = await TaskService.deleteTask(req.params.id, req.userId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TaskController();
