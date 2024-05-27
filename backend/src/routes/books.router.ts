import express from "express";
import auth from "../middleware/auth";
import {
  createBook,
  getBookBasicInfo,
  getBookById,
  getBooks,
} from "../controllers/books.controller";

const booksRouter = express.Router();

booksRouter.get("/all", getBooks);
booksRouter.post("/create", auth.hasPermissions, createBook);
booksRouter.get("/:id", getBookById);
booksRouter.get("/asd", getBookBasicInfo);

export default booksRouter;
