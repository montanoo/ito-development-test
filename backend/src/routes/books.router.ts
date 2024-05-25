import express from "express";
import auth from "../middleware/auth";
import { createBook, getBooks } from "../controllers/books.controller";

const booksRouter = express.Router();

booksRouter.get("/all", getBooks);
booksRouter.post("/create", auth.hasPermissions, createBook);

export default booksRouter;
