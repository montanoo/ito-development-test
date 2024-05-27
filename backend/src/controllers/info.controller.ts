import { NextFunction, Request, Response } from "express";
import infoServices from "../services/info.services";
import booksServices from "../services/books.services";

export const getInfo = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const data = await infoServices.getBaseInfo();
    return response.status(200).json(data);
  } catch (err: any) {
    return response.status(400).json({ error: "Something went wrong" });
  }
};
