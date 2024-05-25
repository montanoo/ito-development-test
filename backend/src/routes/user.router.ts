import express from "express";
import { register } from "../controllers/user.controller";

const userRouter = express.Router();

// POST (register users)
userRouter.post("/register", register);

export default userRouter;
