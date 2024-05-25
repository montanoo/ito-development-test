import { NextFunction, Request, Response } from "express";
import { uuid } from "uuidv4";
import userServices from "../services/user.services";
import tokens from "../utils/tokens";

export const register = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };
    if (!email || !password) {
      return response
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const user = await userServices.register({
      email: email,
      password: password,
    });
    const jti = uuid();

    const { token, refresher } = tokens.welcomeUser(user, jti);
    await userServices.addToken({ jti, refresher, userId: user.id });

    // Send a success response
    return response.status(201).json({ user, token, refresher });
  } catch (error: any) {
    // Pass the error to the error handling middleware
    next(error);
  }
};
