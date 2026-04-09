// middleware/auth.middleware.js
// Single Responsibility: handles only JWT token verification.

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: 401, message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach userId to request for downstream handlers
    next();
  } catch (err) {
    return res.status(403).json({ status: 403, message: 'Invalid or expired token.' });
  }
};

module.exports = { verifyToken };
