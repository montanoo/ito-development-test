import { PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();

async function main() {
  // Delete all existing data
  await prisma.bookRegistry.deleteMany();
  await prisma.user.deleteMany();
  await prisma.roles.deleteMany();
  await prisma.books.deleteMany();
  await prisma.author.deleteMany();
  await prisma.genre.deleteMany();

  // Reset the ID sequences
  await prisma.$executeRaw`ALTER SEQUENCE "Roles_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Genre_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Author_id_seq" RESTART WITH 1;`;

  // Seed roles
  await prisma.roles.createMany({
    data: [
      {
        name: "librarian",
        description: "librarian role, can add students",
      },
      {
        name: "student",
        description: "student, can borrow books",
      },
    ],
  });

  // Seed genres
  await prisma.genre.createMany({
    data: [
      {
        name: "Fiction",
        description: "Fictional genre",
      },
      {
        name: "Non-Fiction",
        description: "Non-Fictional genre",
      },
      {
        name: "Science Fiction",
        description: "Sci-Fi genre",
      },
    ],
  });

  // Seed authors
  await prisma.author.createMany({
    data: [
      {
        name: "J.K. Rowling",
      },
      {
        name: "George R.R. Martin",
      },
      {
        name: "Isaac Asimov",
      },
    ],
  });

  const userData = {
    email: "librarian@ito.com",
    password: "password",
  };

  await axios.post("http://localhost:3000/api/user/register", userData);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
