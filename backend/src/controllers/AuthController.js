// controllers/AuthController.js
// Single Responsibility: handles only HTTP request/response logic for authentication.

const UserService = require('../services/UserService');

class AuthController {
  async register(req, res, next) {
    try {
      const result = await UserService.register(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err); // delegates to centralized error handler
    }
  }

  async login(req, res, next) {
    try {
      const result = await UserService.login(req.body);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
