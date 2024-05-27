import { PrismaClient } from "@prisma/client";

const database = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export default database;
