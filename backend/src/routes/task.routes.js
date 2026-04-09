// routes/task.routes.js — maps /api/tasks/* to TaskController, protected by JWT middleware

const express = require('express');
const { verifyToken } = require('../middleware/auth.middleware');
const TaskController = require('../controllers/TaskController');

const router = express.Router();

// All task routes require a valid JWT
router.use(verifyToken);

// GET  /api/tasks       — retrieve all tasks for the authenticated user
router.get('/', (req, res, next) => TaskController.getTasks(req, res, next));

// POST /api/tasks       — create a new task via TaskFactory
router.post('/', (req, res, next) => TaskController.createTask(req, res, next));

// GET  /api/tasks/:id   — retrieve a single task by ID
router.get('/:id', (req, res, next) => TaskController.getTaskById(req, res, next));

// PUT  /api/tasks/:id   — update task fields
router.put('/:id', (req, res, next) => TaskController.updateTask(req, res, next));

// DELETE /api/tasks/:id — permanently delete a task
router.delete('/:id', (req, res, next) => TaskController.deleteTask(req, res, next));

module.exports = router;
