import express from "express";
import userRouter from "./user.router";
import booksRouter from "./books.router";

const router = express.Router();

router.use("/user", userRouter);
router.use("/books", booksRouter);

export default router;
