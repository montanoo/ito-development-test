import express from "express";
import {
  getInfo,
  requestAllBorrowedInfo,
  requestBook,
  requestBorrowedInformation,
  returnBook,
} from "../controllers/info.controller";
import auth from "../middleware/auth";

const infoRouter = express.Router();

infoRouter.get("/all", getInfo);
infoRouter.post("/request", auth.hasPermissions, requestBook);
infoRouter.get("/my/books", auth.hasPermissions, requestBorrowedInformation);
infoRouter.get("/pending", auth.hasPermissions, requestAllBorrowedInfo);
infoRouter.post("/return", auth.hasPermissions, returnBook);

export default infoRouter;
