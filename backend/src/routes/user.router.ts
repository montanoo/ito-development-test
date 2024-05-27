import express from "express";
import { login, refreshToken, register } from "../controllers/user.controller";
import auth from "../middleware/auth";

const userRouter = express.Router();

// POST (register users)
userRouter.post("/register", register);

// POST (login users)
userRouter.post("/login", login);

//  POST (refresh tokens)
userRouter.post("/refresh", auth.hasPermissions, refreshToken);
export default userRouter;
