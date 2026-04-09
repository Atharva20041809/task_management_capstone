// lib/prisma.js — singleton, injectable abstraction
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;
