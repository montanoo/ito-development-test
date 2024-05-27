import { NextFunction, Request, Response } from "express";
import infoServices from "../services/info.services";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IRequestModified } from "../middleware/auth";

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

export const requestBook = async (
  request: IRequestModified,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.body;
    const { userId } = request.user as { userId: string };
    const data = await infoServices.requestBook(id, userId);
    return response.status(200).json(data);
  } catch (err: any) {
    console.log("HERE XD");
    return response.status(400).json({ error: "Already borrowed this book" });
  }
};
