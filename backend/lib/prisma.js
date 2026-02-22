const { PrismaClient } = require("@prisma/client");

// Just default constructor; Prisma reads DATABASE_URL automatically
const prisma = new PrismaClient();

module.exports = prisma;