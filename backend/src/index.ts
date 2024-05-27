import app from "./app";
import router from "./routes/router";

app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function checkPrismaConnection() {
  console.log(process.env.DATABASE_URL);
  try {
    await prisma.$connect();
    console.log("Prisma connected to the database successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await prisma.$disconnect();
    console.log("Prisma disconnected from the database.");
  }
}

checkPrismaConnection();
