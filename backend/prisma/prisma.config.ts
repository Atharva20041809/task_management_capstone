import "dotenv/config";

export default {
    schema: "prisma/schema.prisma",
    url: process.env.DATABASE_URL,  // <--- required for `db push`
};