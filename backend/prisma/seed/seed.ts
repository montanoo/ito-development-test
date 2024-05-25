import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const librarian = await prisma.roles.create({
    data: {
      name: "Librarian",
      description: "This is the librarian!",
    },
  });
  console.log(librarian);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
