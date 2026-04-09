// middleware/error.middleware.js
// Centralized error handler — returns consistent JSON error responses.

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[ERROR] ${statusCode}: ${message}`);

  res.status(statusCode).json({ status: statusCode, message });
};

module.exports = errorHandler;
