import { Books } from "@prisma/client";
import database from "../utils/database";

async function getAll(
  skip: number,
  params: {
    genreId?: number;
    authorId?: number;
    title?: string;
  }
) {
  const { genreId, authorId, title } = params;

  const query: any = {};

  if (genreId) {
    query.genreId = genreId;
  }

  if (authorId) {
    query.authorId = authorId;
  }

  if (title) {
    query.title = {
      contains: title,
      mode: "insensitive",
    };
  }
  return await database.books.findMany({
    skip,
    take: 10,
    where: query,
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
