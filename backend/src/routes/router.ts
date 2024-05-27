import express from "express";
import userRouter from "./user.router";
import booksRouter from "./books.router";
import infoRouter from "./info.router";

const router = express.Router();

router.use("/user", userRouter);
router.use("/books", booksRouter);
router.use("/info", infoRouter);

export default router;
