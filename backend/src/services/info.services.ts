import database from "../utils/database";

async function getBaseInfo() {
  const [genres, authors, roles] = await Promise.all([
    database.genre.findMany(),
    database.author.findMany(),
    database.roles.findMany(),
  ]);

  return { genres, authors, roles };
}

async function requestBook(id: number, userId: string) {
  try {
    const book = await database.books.findUnique({
      where: { id },
    });

    if (!book) {
      throw new Error("Book not found");
    }

    if (book.stock <= 0) {
      throw new Error("Not in stock");
    }

    const existingEntry = await database.bookRegistry.findFirst({
      where: {
        userId: userId,
        booksId: id,
        state: "awaiting",
      },
    });

    if (existingEntry) {
      throw new Error("You have already borrowed this book");
    }

    const updatedBook = await database.books.update({
      where: {
        id,
      },
      data: {
        stock: book.stock - 1,
      },
    });
    await database.bookRegistry.create({
      data: {
        userId: userId,
        booksId: id,
        amount: 1,
        state: "awaiting",
        date: new Date(),
      },
    });

    return updatedBook;
  } catch (error) {
    console.error("Error updating book stock:", error);
    throw error;
  }
}

export default { getBaseInfo, requestBook };
