import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import crypto from "crypto";

function prepareToken(token: crypto.BinaryLike) {
  return crypto.createHash("sha512").update(token).digest("hex");
}

function generateToken(user: User) {
  return jwt.sign(
    { userId: user.id },
    process.env.JWT_ACCESS_TOKEN || "defaultSecretKey",
    {
      expiresIn: "24h",
    }
  );
}

function refreshToken(user: User, jti: String) {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    process.env.JWT_REFRESH_TOKEN || "defaultSecretKey",
    {
      expiresIn: "7d",
    }
  );
}

function welcomeUser(user: User, jti: String) {
  const token = generateToken(user);
  const refresher = refreshToken(user, jti);

  return {
    token,
    refresher,
  };
}

export default { prepareToken, generateToken, refreshToken, welcomeUser };
