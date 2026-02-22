// lib/prisma.js
const { PrismaClient } = require('@prisma/client');
require('dotenv').config(); // ensure .env is loaded

const prisma = new PrismaClient();

module.exports = prisma;