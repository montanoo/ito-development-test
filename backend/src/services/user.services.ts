import { User } from "@prisma/client";
import database from "../utils/database";
import bcrypt from "bcrypt";
import tokens from "../utils/tokens";

interface CreateUserInput {
  email: string;
  password: string;
}

async function addToken({
  jti,
  refresher,
  userId,
}: {
  jti: string;
  refresher: string;
  userId: string;
}) {
  const data = await database.token.create({
    data: {
      id: jti,
      token: tokens.prepareToken(refresher),
      userId,
    },
  });
  return data;
}

async function register(user: CreateUserInput): Promise<User> {
  user.password = bcrypt.hashSync(user.password, 4);
  const data = await database.user.create({
    data: {
      email: user.email,
      password: user.password,
    },
  });

  return data;
}

export default { register, addToken };
