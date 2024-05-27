import database from "../utils/database";

async function getBaseInfo() {
  const [genres, authors] = await Promise.all([
    database.genre.findMany(),
    database.author.findMany(),
  ]);

  return { genres, authors };
}

async function requestBook(id: number, userId: string) {
  try {
    console.log(userId);
    const book = await database.books.findUnique({
      where: { id },
    });

    if (!book) {
      throw new Error("Book not found");
    }

    if (book.stock <= 0) {
      throw new Error("Not in stock");
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
