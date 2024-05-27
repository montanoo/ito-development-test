import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface IRequestModified extends Request {
  user?: JwtPayload;
}

function hasPermissions(
  request: IRequestModified,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers as { authorization: string };
  if (!authorization) {
    response.status(403).json({ message: "Forbidden" });
  }
  try {
    const token = authorization.replace("Bearer ", "");
    jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN || "defaultSecretKey",
      (err, user) => {
        if (err) return response.sendStatus(403);
        console.log(user);
        request.user = user as JwtPayload;
        next();
      }
    );
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      response.status(403).json({ error: "Forbidden" });
    }
    throw new Error(err.message);
  }
}

export default { hasPermissions };
