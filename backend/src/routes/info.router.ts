import express from "express";
import { getInfo, requestBook } from "../controllers/info.controller";
import auth from "../middleware/auth";

const infoRouter = express.Router();

infoRouter.get("/all", getInfo);
infoRouter.post("/request", auth.hasPermissions, requestBook);

export default infoRouter;
