import { Token, User } from "@prisma/client";
import database from "../utils/database";
import bcrypt from "bcrypt";
import tokens from "../utils/tokens";

interface CreateUserInput {
  email: string;
  roleId?: number;
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

async function create(user: CreateUserInput): Promise<User> {
  user.password = bcrypt.hashSync(user.password, 4);
  const data = await database.user.create({
    data: {
      email: user.email,
      roleId: user.roleId ?? 1,
      password: user.password,
    },
  });

  return data;
}

async function userExists(user: CreateUserInput): Promise<User | null> {
  const data = await database.user.findUnique({
    where: {
      email: user.email,
    },
  });
  return data;
}

async function findUserById(userId: string): Promise<User | null> {
  const data = await database.user.findUnique({
    where: {
      id: userId,
    },
  });
  return data;
}

async function findToken(id: string): Promise<Token | null> {
  const data = await database.token.findUnique({
    where: {
      id,
    },
  });
  return data;
}

async function revokeToken(id: string) {
  return database.token.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
}

export default {
  create,
  addToken,
  userExists,
  findToken,
  revokeToken,
  findUserById,
};
