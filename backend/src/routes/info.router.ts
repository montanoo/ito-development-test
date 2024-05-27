import express from "express";
import { getInfo } from "../controllers/info.controller";

const infoRouter = express.Router();

infoRouter.get("/all", getInfo);

export default infoRouter;
