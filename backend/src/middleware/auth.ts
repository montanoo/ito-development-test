import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function hasPermissions(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers as { authorization: string };
  if (!authorization) {
    response.status(403).json({ message: "Forbidden" });
  }
  try {
    const token = authorization.replace("Bearer ", "");
    console.log(token);
    const payload = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN || "defaultSecretKey"
    );
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      response.status(403).json({ error: "Forbidden" });
    }
    throw new Error(err.message);
  }
  return next();
}

export default { hasPermissions };
