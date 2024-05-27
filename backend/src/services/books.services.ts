import { Books } from "@prisma/client";
import database from "../utils/database";

async function getAll(skip: number) {
  return await database.books.findMany({
    skip,
    take: 10,
    include: {
      Author: true,
      Genre: true,
    },
  });
}

async function getTotalCount() {
  return await database.books.count();
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

async function getById(id: number): Promise<Books | null> {
  const data = await database.books.findUnique({
    where: {
      id,
    },
  });
  return data;
}

export default { getAll, create, getTotalCount, getById };
