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

async function getRequestedBooksByUser(userId: string) {
  console.log(userId);
  const information = await database.bookRegistry.findMany({
    where: {
      userId,
      state: "awaiting",
    },
    include: {
      Books: {
        include: {
          Author: true,
          Genre: true,
        },
      },
    },
  });

  return information;
}

async function getAllPendingInformation() {
  const information = await database.bookRegistry.findMany({
    where: {
      state: "awaiting",
    },
    include: {
      Books: {
        include: {
          Author: true,
          Genre: true,
        },
      },
      User: true,
    },
  });

  return information;
}

async function returnBook(id: number, borrowId: number) {
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
        id: borrowId,
        booksId: id,
        state: "awaiting",
      },
    });

    if (!existingEntry) {
      throw new Error("Book is not awaiting");
    }

    const updatedBook = await database.books.update({
      where: {
        id,
      },
      data: {
        stock: book.stock + 1,
      },
    });
    await database.bookRegistry.update({
      where: {
        id: existingEntry.id, // Ensure you're updating the correct entry by its unique ID
      },
      data: {
        state: "returned", // Assuming you want to mark it as returned
        date: new Date(), // Update the date to the return date
      },
    });

    return updatedBook;
  } catch (error) {
    console.error("Error updating book stock:", error);
    throw error;
  }
}

export default {
  getBaseInfo,
  requestBook,
  getRequestedBooksByUser,
  getAllPendingInformation,
  returnBook,
};
