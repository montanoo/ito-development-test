import database from "../utils/database";

async function getAll() {
  return await database.books.findMany({
    include: {
      Author: true,
      Genre: true,
    },
  });
}

export interface ICreateBook {
  title: string;
  publishedYear: number;
  authorId: number;
  genreId: number;
  stock: number;
}
async function create(book: ICreateBook) {
  const data = await database.books.create({
    data: {
      ...book,
    },
  });
  return data;
}

export default { getAll, create };
