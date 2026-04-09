// routes/auth.routes.js — maps /api/auth/* to AuthController

const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// POST /api/auth/register
router.post('/register', (req, res, next) => AuthController.register(req, res, next));

// POST /api/auth/login
router.post('/login', (req, res, next) => AuthController.login(req, res, next));

module.exports = router;
