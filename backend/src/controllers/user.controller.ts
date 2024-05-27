import { NextFunction, Request, Response } from "express";
import { uuid } from "uuidv4";
import userServices from "../services/user.services";
import tokens from "../utils/tokens";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

export const register = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { email, roleId, password } = request.body as {
      email: string;
      roleId?: number;
      password: string;
    };

    if (!email || !password) {
      return response
        .status(400)
        .json({ error: "Email and password are required." });
    }
    const exists = await userServices.userExists({ email, password });
    if (exists) {
      return response.status(400).json({ error: "Account already exists" });
    }

    const user = await userServices.create({
      email,
      roleId: roleId ?? 1,
      password,
    });
    const jti = uuid();

    const { token, refresher } = tokens.welcomeUser(user, jti);
    await userServices.addToken({ jti, token, userId: user.id });

    return response.status(201).json({ exists: user, token, refresher });
  } catch (error: any) {
    next(error);
  }
};

export const login = async (
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

    const exists = await userServices.userExists({ email, password });
    if (!exists) {
      return response.status(403).json({ error: "Account not found" });
    }

    const decryptedPassword = await bcrypt.compare(password, exists.password);
    if (!decryptedPassword) {
      return response.status(403).json({ error: "Invalid credentials" });
    }

    const jti = uuid();
    const { token, refresher } = tokens.welcomeUser(exists, jti);
    await userServices.addToken({ jti, token, userId: exists.id });

    return response.status(200).json({ exists, token, refresher });
  } catch (err: any) {
    next(err);
  }
};

export const refreshToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { refresher } = request.body;
    if (!refresher) {
      return response.status(400).json({ error: "Refresh token is required." });
    }
    const payload = jwt.verify(
      refresher,
      process.env.JWT_REFRESH_TOKEN || "defaultSecretKey"
    ) as JwtPayload;

    if (!payload.jti) {
      return response.status(400).json({ error: "Refresh token is required." });
    }

    const savedToken = await userServices.findToken(payload.jti);
    if (!savedToken || savedToken.revoked) {
      return response.status(403).json({ error: "Unauthorized" });
    }

    const preparedToken = tokens.prepareToken(refresher);
    if (preparedToken !== savedToken.token) {
      return response.status(403).json({ error: "Unauthorized" });
    }

    const user = await userServices.findUserById(payload.userId);
    if (!user) {
      return response.status(403).json({ error: "Unauthorized" });
    }
    await userServices.revokeToken(savedToken.id);
    const jti = uuid();
    const { token, refresher: newRefresher } = tokens.welcomeUser(user, jti);
    await userServices.addToken({
      jti,
      token,
      userId: user.id,
    });

    response.status(200).json({
      user,
      token,
      refresher: newRefresher,
    });
  } catch (err: any) {
    next(err);
  }
};
