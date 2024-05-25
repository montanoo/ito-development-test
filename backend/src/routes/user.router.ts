import express from "express";
import { login, refreshToken, register } from "../controllers/user.controller";

const userRouter = express.Router();

// POST (register users)
userRouter.post("/register", register);

// POST (login users)
userRouter.post("/login", login);

//  POST (refresh tokens)
userRouter.post("/refresh", refreshToken);
export default userRouter;
