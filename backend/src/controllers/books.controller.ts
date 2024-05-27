import { NextFunction, Request, Response } from "express";
import booksServices, { ICreateBook } from "../services/books.services";

export const getBooks = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(request.query.page as string) || 1;
    const skip = (page - 1) * 10;

    const books = await booksServices.getAll(skip);

    const totalBooks = await booksServices.getTotalCount();

    const totalPages = Math.ceil(totalBooks / 10);

    return response
      .status(200)
      .json({ books, currentPage: page, lastPage: totalPages });
  } catch (err: any) {
    return response.status(400).json({ error: "Something went wrong" });
  }
};

export const createBook = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { title, publishedYear, authorId, genreId, stock } =
      request.body as ICreateBook;

    if (!title || !publishedYear || !authorId || !genreId || !stock) {
      return response.status(400).json({ error: "Bad request" });
    }

    const book = await booksServices.create({
      title,
      publishedYear,
      authorId,
      genreId,
      stock,
    });
    return response.status(201).json({ book });
  } catch (err: any) {
    console.log(err.message);
    return response.status(400).json({ error: "Something went wrong" });
  }
};

export const getBookById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.params;
    const data = await booksServices.getById(Number(id));

    return response.status(200).json({ book: data });
  } catch (err) {
    return response.status(404);
  }
};
