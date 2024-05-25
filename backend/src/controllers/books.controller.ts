import { NextFunction, Request, Response } from "express";
import booksServices, { ICreateBook } from "../services/books.services";

export const getBooks = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const books = await booksServices.getAll();

    return response.status(200).json({ books });
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
