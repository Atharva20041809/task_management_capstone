// services/UserService.js
// Single Responsibility: handles only auth business logic (hashing, token generation).

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

class UserService {
  async register({ name, email, password }) {
    if (!name || !email || !password) {
      const err = new Error('name, email, and password are required.');
      err.statusCode = 400;
      throw err;
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      const err = new Error('A user with that email already exists.');
      err.statusCode = 409;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return { message: 'User registered successfully.', userId: user.id };
  }

  async login({ email, password }) {
    if (!email || !password) {
      const err = new Error('email and password are required.');
      err.statusCode = 400;
      throw err;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const err = new Error('Invalid email or password.');
      err.statusCode = 401;
      throw err;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error('Invalid email or password.');
      err.statusCode = 401;
      throw err;
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    return {
      token,
      user: { id: user.id, name: user.name },
    };
  }
}

module.exports = new UserService();
