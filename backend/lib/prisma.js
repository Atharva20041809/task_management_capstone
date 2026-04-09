// lib/prisma.js
require('dotenv').config(); // load env vars before PrismaClient reads DATABASE_URL
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;